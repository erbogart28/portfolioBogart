class StaticPagesController < ApplicationController
    layout "homelayout", only: [:index]
    def index
        @contact = StaticPage.new(params[:static_pages])
    end
    
    def new
        @contact = StaticPage.new
    end

    def create
        @contact = StaticPage.new(params[:static_pages])
        @contact.request = request
        respond_to do |format|
        if @contact.deliver
            # re-initialize Home object for cleared form
            @contact = StaticPage.new
            format.html { render 'index'}
            format.js   { flash.now[:success] = @message = "Thank you for your message. I'll get back to you soon!" }
            else
                format.html { render 'index' }
                format.js   { flash.now[:error] = @message = "Message did not send." }
            end
        end
    end
end
