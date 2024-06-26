// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ArcumanToken is ERC20 {
    uint constant _initial_supply = 1000 * (10**18);
    constructor() ERC20("ArcumanToken", "ARC") {
        _mint(msg.sender, _initial_supply);
    }
}
