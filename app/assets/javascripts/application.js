// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

const Thumbnails = () => {

    const _THUMBNAIL_CLASS = 'o-grid__item'

    const _rect = $('.js-rect')
    const _backdrop = $('.js-backdrop')
    const _modal = $('.c-modal')
    const _thumbnails = $$('.js-thumbnails .' + _THUMBNAIL_CLASS)

    let _animating = false
    let _currentThumbnail = null

    const _toggleBackdrop = () => {
        _backdrop.classList.toggle('is-visible')
    }

    const _toggleModal = () => {
        _modal.classList.toggle('is-visible')
    }

    const _toggleScrolling = () => {
        document.body.classList.toggle('is-scrolling-disabled')
    }

    const _scrollTopModal = () => _modal.scrollTop = 0

    const _getTargetRectSize = () => {
        const windowWidth = document.body.offsetWidth
        const windowHeight = window.innerHeight
        const mq = window.matchMedia('(min-width: 800px)').matches
        const topMargin = mq ? 100 : 50
        const modalScrollTop = _modal.scrollTop

        const width = mq ? windowWidth * .8 : windowWidth
        const height = windowHeight
        const top = modalScrollTop > topMargin ?
            0 :
            topMargin - modalScrollTop
        const left = ((windowWidth - width) / 2)

        return {
            width,
            height,
            top,
            left
        }
    }

    const _resetRect = () => {
        _rect.style.width = ''
        _rect.style.height = ''
        _rect.style.top = ''
        _rect.style.left = ''
        _rect.style.transform = ''
    }

    const _setRectAnimatable = () => {
        _rect.classList.add('is-animatable')
        _rect.once('transitionend', () =>
            _rect.classList.remove('is-animatable'))
    }

    const _fadeRect = (fadeIn = true) => {
        let resolve
        const promise = new Promise(_resolve => {
            resolve = _resolve
        })

        _setRectAnimatable()
        _rect.classList[fadeIn ? 'add' : 'remove']('is-visible')
        _rect.once('transitionend', resolve)

        return promise
    }

    const _fadeInRect = () => _fadeRect(true)
    const _fadeOutRect = () => _fadeRect(false)

    const _positionRectOverThumbnail = () => {
        const {
            width,
            height,
            top,
            left
        } = _currentThumbnail.getBoundingClientRect()

        _rect.style.width = `${ width }px`
        _rect.style.height = `${ height }px`
        _rect.style.top = `${ top }px`
        _rect.style.left = `${ left }px`
    }

    const _positionRectOnTargetPosition = () => {
        const {
            width,
            height,
            top,
            left
        } = _getTargetRectSize()

        _rect.style.width = `${ width }px`
        _rect.style.height = `${ height }px`
        _rect.style.top = `${ top }px`
        _rect.style.left = `${ left }px`
    }

    const _positionRectZoomedIn = () => {
        const {
            width,
            height,
            top,
            left
        } = _rect.getBoundingClientRect()
        const {
            width: targetRectWidth,
            height: targetRectHeight,
            top: targetRectTop,
            left: targetRectLeft
        } = _getTargetRectSize()

        let scaleX = targetRectWidth / width
        let scaleY = targetRectHeight / height

        const targetLeft =
            // current position
            left
            // minus target position
            -
            targetRectLeft
            // minus offset set by scaling
            -
            ((width * scaleX - width) / 2)

        const targetTop =
            // current position
            top
            // minus target position
            -
            targetRectTop
            // minus offset set by scaling
            -
            ((height * scaleY - height) / 2)

        let translateX = -targetLeft / scaleX
        let translateY = -targetTop / scaleY

        scaleX = Math.round(scaleX * 1000) / 1000
        scaleY = Math.round(scaleY * 1000) / 1000
        translateX = Math.round(translateX * 1000) / 1000
        translateY = Math.round(translateY * 1000) / 1000

        _rect.style.transform = `scale(${ scaleX }, ${ scaleY }) translate(${ translateX }px, ${ translateY }px)`
    }

    const _positionRectZoomedOut = () => {
        const thumbnailBCR = _currentThumbnail.getBoundingClientRect()
        const rectBCR = _rect.getBoundingClientRect()

        let scaleX = thumbnailBCR.width / rectBCR.width
        let scaleY = thumbnailBCR.height / rectBCR.height

        const targetLeft =
            // current position
            rectBCR.left
            // minus target position
            -
            thumbnailBCR.left
            // minus offset set by scaling
            -
            ((rectBCR.width * scaleX - rectBCR.width) / 2)

        const targetTop =
            // current position
            rectBCR.top
            // minus target position
            -
            thumbnailBCR.top
            // minus offset set by scaling
            -
            ((rectBCR.height * scaleY - rectBCR.height) / 2)

        let translateX = -targetLeft / scaleX
        let translateY = -targetTop / scaleY

        scaleX = Math.round(scaleX * 1000) / 1000
        scaleY = Math.round(scaleY * 1000) / 1000
        translateX = Math.round(translateX * 1000) / 1000
        translateY = Math.round(translateY * 1000) / 1000

        _rect.style.transform = `scale(${ scaleX }, ${ scaleY }) translate(${ translateX }px, ${ translateY }px)`
    }

    const _transformRect = () => {
        let resolve
        const promise = new Promise(_resolve => {
            resolve = _resolve
        })

        _setRectAnimatable()

        _rect.style.transform = ''

        _rect.once('transitionend', resolve)

        return promise
    }

    const _open = e => {
        if (_animating) return

        _animating = true
        _currentThumbnail = e.target.classList.contains(_THUMBNAIL_CLASS) ?
            e.target : e.target.parentElement

        _positionRectOnTargetPosition()
        _positionRectZoomedOut()
        setTimeout(() => {
            _toggleBackdrop()
            _fadeInRect()
                .then(_transformRect)
                .then(_toggleModal)
                .then(_fadeOutRect)
                .then(_resetRect)
                .then(_toggleScrolling)
                .then(() => _animating = false)
        }, 30)
    }

    const _close = () => {
        if (_animating) return

        _animating = true

        _toggleScrolling()
        _positionRectOverThumbnail()
        _positionRectZoomedIn()
        setTimeout(() => {
            _fadeInRect()
                .then(_scrollTopModal)
                .then(_toggleModal)
                .then(_toggleBackdrop)
                .then(_transformRect)
                .then(_fadeOutRect)
                .then(_resetRect)
                .then(() => _animating = false)
        }, 30)
    }

    _thumbnails.on('click', _open)
    _modal.on('click', _close)

}

Thumbnails()