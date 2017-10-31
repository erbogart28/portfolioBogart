Rails.application.routes.draw do
    
    get root 'static_pages#home'
    
    get 'static_pages/sharkoWires'
    
    get 'static_pages/greatmoods'
    
    get 'static_pages/spokinResearch'
    
    get 'static_pages/render_dev' 

    get 'static_pages/render_design' 

end
