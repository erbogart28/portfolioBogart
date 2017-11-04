class RenderDevController < ApplicationController
    def render_dev
        respond_to do |format|               
            format.all
        end    
    end
end