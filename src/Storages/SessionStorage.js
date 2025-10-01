const handleTablesPagesHistory = (action, props) => {
   const data = JSON.parse(sessionStorage.getItem('tablesPagesHistory') || '{}');

   switch (action) {
      case 'update':
         if (props.key != null && props.newValue != null) {
            data[props.key] = props.newValue;
         }
         break;

      case 'getItem':
         return data[props.key];

      case 'get':
         return data;

      default:
         console.warn(`Unknown action: ${action}`);
   }

   if (action != 'get') {
      sessionStorage.setItem('tablesPagesHistory', JSON.stringify(data));
   }
};

export default handleTablesPagesHistory ;
