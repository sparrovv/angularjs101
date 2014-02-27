require 'sinatra'

require 'json'

class LunchTime < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :public_folder, settings.root + '/app'

  get "/" do
    send_file File.join(settings.public_folder, 'index.html')
  end

  get "/places" do
    content_type :json
    PlaceRepo.all.map(&:to_h).to_json
  end

  post "/place" do
    place_params = JSON.parse(request.env["rack.input"].read).
      fetch('place').symbolize_keys

    place = Place.build(place_params)

    PlaceRepo.add(place)
    content_type :json
  end

  ################
  # Presentation - not related to the app
  ################
  Tilt.register Tilt::ERBTemplate, 'html.erb'
  get '/presentation' do
    @presentation = File.read('./presentation.md')
    erb :presentation
  end
end

class Place < Struct.new(:id, :name, :description, :price, :lat, :long)
  def self.build(attrs={})
    new(
      attrs.fetch(:id), attrs.fetch(:name), attrs.fetch(:description), attrs.fetch(:price), attrs.fetch(:lat), attrs.fetch(:long)
    )
  end
end

class PlaceRepo
  PLACES = [
    Place.build({id:'1', name: 'Pret a manager', description: 'Handmade natural food', price: 1, lat: 45, long: 45}),
    Place.build({id:'2', name: 'Moorgate curry', description: 'Cheap and good cheackpea curry', price: 1, lat: 45, long: 45})
  ]

  def self.all
    PLACES
  end

  def self.add(place)
    PLACES.push(place)
  end
end

class Hash
  def symbolize_keys
    _symbolize_keys(self)
  end

  def _symbolize_keys(hash)
    hash.inject({}){|result, (key, value)|
      new_key = case key
                when String then key.to_sym
                else key
                end
      new_value = case value
                  when Hash then symbolize_keys(value)
                  else value
                  end
      result[new_key] = new_value
      result
    }
  end
end
