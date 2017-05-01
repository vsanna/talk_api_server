json.messages do
  json.array! @messages do |m|
    @count ||= 0
    json.type @count.even? ? 'right' : 'left'
    json.body m
    @count += 1
  end
end
