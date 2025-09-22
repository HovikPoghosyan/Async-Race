const handleGarageRaceStatusesHistory = ( action, props ) => {
  const data = JSON.parse( sessionStorage.getItem( 'garageRaceStatusesHistory' ) || '{}');

  switch ( action ) {
      case 'delete':
         delete data[ props.key ];
         break;

      case 'update':
         if ( props.key != null && props.newValue != null ) {
         data[ props.key ] = props.newValue;
         }
         break;

      case 'add':
         if ( props.key != null && props.newValue != null ) {
         data[ props.key ] = props.newValue;
         }
         break;
      
      case 'getItem':
         return data[ props.key ];

      case 'get':
         return data;

      default:
         console.warn(`Unknown action: ${ action }`);
  }

   if ( action != 'get' ) sessionStorage.setItem('garageRaceStatusesHistory', JSON.stringify( data ));
   else return;
};

const handleTablesPagesHistory = ( action, props ) => {
  const data = JSON.parse( sessionStorage.getItem( 'tablesPagesHistory' ) || '{}');

  switch ( action ) {
      case 'update':
         if ( props.key != null && props.newValue != null ) {
            data[ props.key ] = props.newValue;
         }
         break;
      
      case 'getItem':
         return data[ props.key ];

      case 'get':
         return data;

      default:
         console.warn(`Unknown action: ${ action }`);
  }

   if ( action != 'get' ) sessionStorage.setItem('tablesPagesHistory', JSON.stringify( data ));
   else return;
};


export {
   handleGarageRaceStatusesHistory,
   handleTablesPagesHistory,
};