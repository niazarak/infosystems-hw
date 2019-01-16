require "sinatra"
require 'sinatra/base'
require "sinatra/activerecord"

class ApplicationController < Sinatra::Base
	
	configure do
		set :environment, :development
		set :public_folder, "public"
		enable :sessions
		set :session_secret, "ummsecrettt"
		Dir["./models/*.rb"].each {|file| require file }
	end

	helpers do
		def logged_in?
			!!current_user
		end
		
		def current_user
			if session[:user_id]
				User.find_by id: session[:user_id]
			else
				nil
			end
		end

		def redirect_if_not_logged_in
			if !logged_in?
		    	redirect to '/signin'
		   	end
		end
	end

	get "/" do
		@message = "ssss"
		erb :index
	end

	get "/signin" do
		erb :signin
	end

	post "/signin" do
		@user = User.find_by name: params[:name]
		if @user and @user.password == params[:password]
			session.clear
			session[:user_id] = @user.id
			redirect to "/"
		else
			redirect to "/signin"
		end
	end

	post "/logout" do
		session.clear
		redirect to "/"
	end

	get "/collectors" do
		@collectors = Collector.all
		erb :'/collectors/index'
	end

	post "/collectors" do
		if params[:name] == ""
			redirect to '/collector/new'
		else
			@collector = Collector.create(params)
			@collector.save
			redirect to "/collector/#{@collector.id}"
		end
	end

	get "/collector/new" do
		redirect_if_not_logged_in
		erb :'/collectors/new'
	end

	get "/collector/:id" do
		@collector = Collector.find_by id: params['id']
		if not @collector
			halt 404
		else 
			erb :'/collectors/show'
		end
	end

	get "/collector/:id/newPostmark" do
		redirect_if_not_logged_in
		@collector = Collector.find_by id: params['id']
		if not @collector
			halt 400
		else 
			erb :'/postmarks/new'
		end
	end

	post "/collector/:id/postmarks" do
		redirect_if_not_logged_in
		@collector = Collector.find_by id: params['id']
		if not @collector
			halt 400
		else 
			@postmark = Postmark.create(name: params[:name], year: params[:year])
			if @postmark.valid?
				@collector.postmarks << @postmark
				@postmark.save
				redirect to "/collector/#{@collector.id}"
			else
				redirect to "/collector/#{@collector.id}/newPostmark"
			end
		end
	end

	post "/collector/:id/delete" do
		redirect_if_not_logged_in
		@collector = Collector.find_by id: params['id']
		if not @collector
			halt 404
		else 
			@collector.destroy
			redirect to "/collectors"
		end
	end

	# Postmarks
	get "/postmarks" do
		@postmarks = Postmark.all
		erb :'/postmarks/index'
	end

	get "/postmark/:id" do
		@postmark = Postmark.find_by id: params['id']
		if not @postmark
			halt 404
		else
			erb :'/postmarks/show'
		end
	end

	post "/postmark/:id/delete" do
		redirect_if_not_logged_in
		@postmark = Postmark.find_by id: params['id']
		if not @postmark
			halt 404
		else
			@collector = @postmark.collector
			@postmark.destroy
			redirect to "/collector/#{@collector.id}"
		end
	end

	run! if app_file == $0
end