class CreatePostmarks < ActiveRecord::Migration[5.2]
  def change
  	create_table :postmarks do |t|
  		t.string :name
  		t.integer :year
  		t.integer :collector_id
  	end
  end
end
