class CreateCollectors < ActiveRecord::Migration[5.2]
  def change
  	create_table :collectors do |t|
  		t.string :name
  		t.timestamps
  	end
  end
end
