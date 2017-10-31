class RenderDesignController < ApplicationController
    
    def render_design
        respond_to do |format|               
        format.js
        end 
    end 
end
