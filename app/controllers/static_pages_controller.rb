class StaticPagesController < ApplicationController
    layout "application", except: [:home]
    def home
        render layout: "homelayout"
    end

    def development
    end
    
    def design
    end
end
