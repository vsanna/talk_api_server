Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'

  namespace :api, { format: 'json' } do
    get '/chat', to: 'chats#chat'
  end
end
