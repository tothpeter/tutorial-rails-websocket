Rails.application.routes.draw do
  devise_for :users
  root 'products#index'

  resources :products do
    resources :auctions, only: [ :create ] do
      resources :bids, only: [ :create ]
    end

    member do
      put :transfer
    end
  end
end
