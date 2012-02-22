class CreateHotels < ActiveRecord::Migration
	def change
		create_table :hotels do |t|
		t.integer :location_id
		t.string :title
		t.text :address
		t.string :phone
		t.string :email
		t.string :site
		t.text :html_description
		t.integer :user_admin_id
		t.string :gps_data
		t.string :type
		t.text :services
		t.text :equipment

		t.timestamps
		end
	end

	def self.down
		drop_table :hotels
	end
end
