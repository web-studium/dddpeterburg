class CreateHotelRooms < ActiveRecord::Migration
	def change
		create_table :hotel_rooms do |t|
		t.integer :hotel_id
		t.string :category
		t.boolean :avialability

	  	t.timestamps
		end
	end
end
