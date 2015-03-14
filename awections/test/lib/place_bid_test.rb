require 'test_helper'
require 'place_bid'

class PlaceBidTest < Minitest::Test
  def test_it_places_a_bid
    user = User.create! email: "email@email.com", password: "12345678"
    another_user = User.create! email: "email2@email.com", password: "12345678"
    product = Product.create! name: "name"
    auction = Auction.create! value: 10, product_id: product.id

    service = PlaceBid.new value: 11, user_id: another_user.id, auction_id: auction.id

    service.execute

    assert_equal 11, auction.current_bid 
  end
end