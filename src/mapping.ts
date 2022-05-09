import { BigInt } from "@graphprotocol/graph-ts"
import {
  EnsMapper,
  TextChanged as TextChangedEvent
} from "../generated/EnsMapper/EnsMapper"
import { TextChanged as TextChangedEntity } from "../generated/schema"

export function handleTextChanged(event: TextChangedEvent): void {
  let entity = new TextChangedEntity(event.block.number.toString().concat('-').concat(event.logIndex.toString()))

  // BigInt and BigDecimal math are supported
  entity.blockNumber = event.block.number.toI32()
  entity.transactionID = event.transaction.hash
  entity.key = event.params.key
  entity.node = event.params.node

  let contract = EnsMapper.bind(event.address)
  entity.name = contract.hashToDomainMap(event.params.node).concat('.pcc.eth')

  entity.save()


  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.addr(...)
  // - contract.address_whitelist(...)
  // - contract.domainHash(...)
  // - contract.domainLabel(...)
  // - contract.domainMap(...)
  // - contract.getAllCatsWithDomains(...)
  // - contract.getClaimableIdsForAddress(...)
  // - contract.getTokensDomains(...)
  // - contract.hashToDomainMap(...)
  // - contract.hashToIdMap(...)
  // - contract.name(...)
  // - contract.nextRegisterTimestamp(...)
  // - contract.nft(...)
  // - contract.nftImageBaseUri(...)
  // - contract.owner(...)
  // - contract.publicClaimOpen(...)
  // - contract.reset_period(...)
  // - contract.supportsInterface(...)
  // - contract.text(...)
  // - contract.texts(...)
  // - contract.tokenHashmap(...)
  // - contract.useEIP155(...)
}
