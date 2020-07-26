pragma solidity ^0.6.0;

contract SupplyChain {

    uint skuCount;

    mapping(uint => Item) items;

    enum State {
      ForSale,
      Sold,
      Shipped,
      Received
    }

    struct Item {
        string name;
        uint sku;
        uint price;
        uint state;
        address payable seller;
        address payable buyer; 
    }

    event ForSale(uint sku);
    event Sold(uint sku);
    event Shipped(uint sku);
    event Received(uint sku);

    modifier verifyCaller (address _address) { 
        require (msg.sender == _address); 
        _;
    }

    modifier paidEnough(uint _price) { 
        require(msg.value >= _price); 
        _;
    }

    modifier checkValue(uint _sku) {
        _;
        uint _price = items[_sku].price;
        uint amountToRefund = msg.value - _price;
        items[_sku].buyer.transfer(amountToRefund);
    }

    modifier forSale (uint _sku) {
        require(items[_sku].state == uint(State.ForSale));
        _;
    }

    modifier sold (uint _sku) {
        require(items[_sku].state == uint(State.Sold));
        _;
    }

    modifier shipped (uint _sku) {
        require(items[_sku].state == uint(State.Shipped));
        _;
    }

    modifier received (uint _sku) {
        require(items[_sku].state == uint(State.Received));
        _;
    }

    constructor() public {
        skuCount = 0;
    }

    function addItem(string memory _name, uint _price) public {
        emit ForSale(skuCount);
        items[skuCount] = Item({name: _name, sku: skuCount, price: _price, state: uint(State.ForSale), seller: msg.sender, buyer: address(0)});
        skuCount = skuCount + 1;
    }

    function buyItem(uint sku)
        public
        payable
        forSale(sku)
        paidEnough(items[sku].price)
        checkValue(sku)
    {
        emit Sold(sku);
        items[sku].buyer = msg.sender;
        items[sku].state = uint(State.Sold);
        items[sku].seller.transfer(items[sku].price);
    }

    function shipItem(uint sku)
        public
        sold(sku)
        verifyCaller(items[sku].seller)
    {
        emit Shipped(sku);
        items[sku].state = uint(State.Shipped);
    }

    function receiveItem(uint sku)
        public
        shipped(sku)
        verifyCaller(items[sku].buyer)
    {
        emit Received(sku);
        items[sku].state = uint(State.Received);
    }

    function fetchItem(uint _sku) public view returns (string memory name, uint sku, uint price, uint state, address seller, address buyer) {
        name = items[_sku].name;
        sku = items[_sku].sku;
        price = items[_sku].price;
        state = uint(items[_sku].state);
        seller = items[_sku].seller;
        buyer = items[_sku].buyer;
        return (name, sku, price, state, seller, buyer);
    }

}