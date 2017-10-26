Rails.application.routes.draw do
    
    get root 'static_pages#home'

    get 'static_pages/development' 
    
    get 'static_pages/design'
    
    get 'static_pages/sharkoWires'
    
    get 'static_pages/greatmoods'
    
end
