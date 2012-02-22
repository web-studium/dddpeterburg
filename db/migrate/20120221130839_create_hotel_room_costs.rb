class CreateHotelRoomCosts < ActiveRecord::Migration
	def change
		create_table :hotel_room_costs do |t|
		t.integer :room_id
		t.timestamp :from
		t.timestamp :to
		t.float :costs

	  	t.timestamps
		end
	end
end
