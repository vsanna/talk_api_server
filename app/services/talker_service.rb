require 'rest-client'
require 'json'

class TalkerService
  attr_accessor :api_key, :options
  def initialize(api_key, params = {})
    self.api_key = api_key
    self.options = configure(params)
  end

  def run(query)
    self.options = self.options.merge({
                                        query: query
                                      })
    call_api
  end

  def chat(query = 'Hello world', num = 10, file = nil)
    num.times do
      res = RestClient.post(endpoint, self.options.merge({query: query}))
      responce = JSON.parse(res)
      rep = responce['results'][0]['reply']
      puts rep
      file.puts rep if file
      query = rep
    end
  end

  def chat_to_output(msg)
    File.open("./#{msg.gsub(/\s/, '_')}.txt", 'w') do |file|
      chat(msg, 10, file)
    end
  end

  def chat_to_array(query = 'おはよう', num = 10)
    [].tap do |ar|
      num.times do
        res = RestClient.post(endpoint, self.options.merge({query: query}))
        responce = JSON.parse(res)
        rep = responce['results'][0]['reply']
        ar << rep
        query = rep
      end
    end
  end

  private

  def endpoint
    'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk'
  end

  def call_api
    res = RestClient.post(endpoint, self.options)
    responce = JSON.parse(res)
    responce['results'][0]['reply']
  end

  def configure(p)
    {
      query: 'Hello world',
      apikey: self.api_key,
      callback: nil
    }.merge(p)
  end

end

