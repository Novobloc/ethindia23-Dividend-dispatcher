// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC20, ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Plugin } from "@1inch/token-plugins/contracts/Plugin.sol";
import { IERC20Plugins } from "@1inch/token-plugins/contracts/interfaces/IERC20Plugins.sol";
import { IDividendDispatcherPlugin } from "./interfaces/IDividendDispatcherPlugin.sol";

contract DividendDispatcherPlugin is IDividendDispatcherPlugin, Plugin, ERC20 {
  error ApproveDisabled();
  error TransferDisabled();

  mapping(address => address) public delegated;
  uint8 public counter = 0;

  constructor(string memory name_, string memory symbol_, IERC20Plugins token_) ERC20(name_, symbol_) Plugin(token_) {} // solhint-disable-line no-empty-blocks

  function delegate(address delegatee) public virtual {
    address prevDelegatee = delegated[msg.sender];
    if (prevDelegatee != delegatee) {
      delegated[msg.sender] = delegatee;
      emit Delegated(msg.sender, delegatee);
      uint256 balance = IERC20Plugins(token).pluginBalanceOf(address(this), msg.sender);
    }
  }

  function _updateBalances(address from, address to, uint256 amount) internal override {
    // increase counter in solidity
    counter = counter + 1;
  }
}
