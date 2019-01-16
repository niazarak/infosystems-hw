class Postmark < ActiveRecord::Base
	belongs_to :collector

	validates :name, presence: true
	validates :year, presence: true
	validates :year, numericality: { greater_than: 0 }
end