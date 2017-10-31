class StaticPagesController < ApplicationController
    layout "application", except: [:home]
    def home
        render layout: "homelayout"
        
    end
    
    def sharkoWires
    end
    
    def greatmoods
    end


end
