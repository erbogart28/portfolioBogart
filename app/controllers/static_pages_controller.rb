class StaticPagesController < ApplicationController
    def home
        render layout: "homelayout"
    end

    def development
        render layout: "application"
    end
    
    def design
        render layout: "application"
    end
end
