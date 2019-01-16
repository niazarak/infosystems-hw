class Collector < ActiveRecord::Base
	has_many :postmarks, dependent: :destroy

	validates :name, presence: true
	validates :name, uniqueness: true
end