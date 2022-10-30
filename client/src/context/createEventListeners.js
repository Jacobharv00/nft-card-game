import { ethers } from 'ethers'
import { ABI } from '../contract'

const AddNewEvent = ( eventFilter, provider, cb ) => {
  // Ensure not having multiple listeners on at same time
  provider.removeListener( eventFilter )

  provider.on( eventFilter, ( Logs ) => {
    const parsedLog = ( new ethers.utils.Interface( ABI ) ).parseLog( Logs )

    cb( parsedLog )
  } )
}

export const createEventListeners = ( { navigate, contract, provider, walletAddress, setShowAlert } ) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer()

  AddNewEvent( NewPlayerEventFilter, provider, ( { args } ) => {
    console.log( 'New Player Created', args )
    if ( walletAddress === args.owner ) {
      setShowAlert( {
        status: true,
        type: 'success',
        message: 'Player has been successfully registered'
      } )
    }
  } )
}