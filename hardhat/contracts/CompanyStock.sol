// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC20, ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Plugins } from "@1inch/token-plugins/contracts/ERC20Plugins.sol";
import { ICompanyStock } from "./interfaces/ICompanyStock.sol";

/// @title DelegatedShare
/// @dev DelegatedShare is a specialized version of an ERC20 token with additional functionalities.
contract CompanyStock is ICompanyStock, ERC20Plugins {
    error ApproveDisabled();
    error TransferDisabled();
    error NotOwnerPlugin();
    
    /// @notice The address of the owner plugin.
    address immutable public ownerPlugin;

    /// @dev Throws if called by any account other than the ownerPlugin.
    modifier onlyOwnerPlugin {
        if (msg.sender != ownerPlugin) revert NotOwnerPlugin();
        _;
    }

    /// @param name_ The name of the token.
    /// @param symbol_ The symbol of the token.
    /// @param maxUserPlugins_ The maximum number of user plugins.
    /// @param pluginCallGasLimit_ The gas limit for plugin calls.
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxUserPlugins_,
        uint256 pluginCallGasLimit_
    ) ERC20(name_, symbol_) ERC20Plugins(maxUserPlugins_, pluginCallGasLimit_) {
        ownerPlugin = msg.sender;
    }

    /// @notice Add default farm for an account if it doesn't exist.
    /// @dev Only callable by the owner plugin.
    /// @param account The account to add default farm for.
    /// @param farm The farm to add.
    // function addDefaultFarmIfNeeded(address account, address farm) external onlyOwnerPlugin {
    //     if (!hasPlugin(account, farm)) {
    //         _addPlugin(account, farm);
    //     }
    // }

    /// @notice Mint tokens.
    /// @dev Only callable by the owner plugin.
    /// @param account The address to mint tokens to.
    /// @param amount The amount of tokens to mint.
    function mint(address account, uint256 amount) external onlyOwnerPlugin {
        _mint(account, amount);
    }

    /// @notice Burn tokens.
    /// @dev Only callable by the owner plugin.
    /// @param account The address to burn tokens from.
    /// @param amount The amount of tokens to burn.
    function burn(address account, uint256 amount) external onlyOwnerPlugin {
        _burn(account, amount);
    }

 
}