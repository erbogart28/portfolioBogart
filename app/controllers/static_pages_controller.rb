class StaticPagesController < ApplicationController
    layout "homelayout", only: [:index]
    def index
        @contact = StaticPage.new(params[:static_page])
    end
    
    def spokinResearch
       render layout: "application"
    end
    
    def greatmoods
        render layout: "application"
    end
    
    def new
        @contact = StaticPage.new
    end

    def create
        @contact = StaticPage.new(params[:static_page])
        @contact.request = request
        respond_to do |format|
        if @contact.deliver
            # re-initialize Home object for cleared form
            @contact = StaticPage.new
            format.html { render 'index'}
            format.js   { flash.now[:success] = @message = "Thank you for reaching out. I will email you back soon!" }
        else
            format.html { render 'index' }
            format.js   { flash.now[:error] = @message = "Message did not send." }
        end
        end
    end
end
