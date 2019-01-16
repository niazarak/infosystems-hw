class User < ActiveRecord::Base
	validates :name, presence: true
	validates :name, uniqueness: true
	validates :password, presence: true
end