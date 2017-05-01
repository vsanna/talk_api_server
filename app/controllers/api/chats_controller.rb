class Api::ChatsController < ApplicationController
  def chat
    chat = TalkerService.new('eG6fzvdluyFD7lZ96ooy7a2kgpH05B6M')
    begin
      @messages = chat.chat_to_array(params[:message])
    rescue => e
      raise StandardError, 'chatが正しく動きませんでした'
    end
  end
end
