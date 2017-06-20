require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_url
    assert_response :success
  end
  
    test "should get wires" do
    get static_pages_sharkoWires_url
    assert_response :success
  end
  
    test "should get dev" do
    get static_pages_development_url
    assert_response :success
  end
  
    test "should get design" do
    get static_pages_design_url
    assert_response :success
  end
end
