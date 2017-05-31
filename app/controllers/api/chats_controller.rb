class Api::ChatsController < ApplicationController
  def chat
    chat = TalkerService.new(ENV[:R_API_TOKEN])
    begin
      @messages = chat.chat_to_array(params[:message])
    rescue => e
      raise StandardError, 'chatが正しく動きませんでした'
    end
  end
end
