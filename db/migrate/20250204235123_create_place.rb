class CreatePlace < ActiveRecord::Migration[7.2]
  def change
    create_table :places do |t|
      t.string :name
      t.string :logo_name

      t.timestamps
    end
  end
end
