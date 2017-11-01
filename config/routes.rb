Rails.application.routes.draw do
 resources :static_pages, only: [:index, :new, :create]   
    get root 'static_pages#index'
    
    get 'static_pages/sharkoWires'
    
    get 'static_pages/greatmoods'
    
    get 'static_pages/spokinResearch'
    
    get 'static_pages/render_dev' 

    get 'static_pages/render_design' 

end
