class StaticPagesController < ApplicationController
    def render_dev
        respond_to do |format|               
        format.js
        end    
    end
end