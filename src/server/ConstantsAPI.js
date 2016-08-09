/**
 *
 * @author T. Carlos Manuel Patiño Machado.
 *
 * @since 08 Octubre 2015
 *
 *	Declaración de constantes que documenta lo Procedimientos Almacenados de la API
 */
var _ = {};
_.globals = {
  hostaddress: 'http://adsigo.teraspace.co:8080'
};
// Estandar Prefijo 'APP' + Acción + Entidad-Objeto
_.applogin = {
    in_mail: 'carlosman79@gmail.com',
    in_password: '123456',
    in_language: 'US',
    in_ip_user_host: ''
};
_.appregister = {
  in_type_user: '',
  in_identification:'',
  in_first_name: '',
  in_last_name: '',
  in_user_photo:  '',
  in_phone:  '',
  in_address:  '',
  in_email:  '',
  in_password:  '',
  in_type_identification:  '',
  in_id_country:  '',
  //in_id_city:  document.getElementById('city').value,
  in_ip_user_host: ''
};
_.appcountry = {

}

_.appgettypestock = {

}
_.appcity = {
    in_country:''
}
_.appstock = {
      in_user_token :'',
     in_id_stock :'',
     in_name: '',
     in_description:'',
     in_id_country:'',
     in_id_city :'',
     in_address :'',
     in_googlemaps :'',
     in_availability :'',
     in_size :'',
     in_target :'',
     in_impact :'',
     in_lighting :'',
     in_hotspot :'',
     in_main_road :'',
     in_fk_id_type_stock :'',
     in_fk_id_user :'',
     in_first_photo :'',
     in_second_photo :'',
     in_third_photo :'',
     in_fourth_photo :'',
     in_daily_price :'',
     in_production_price :''
}
_.applanding = {
  in_user_token :'',
  in_date_start:'',
  in_date_end :'',
  in_id_type_stock:'',
  in_id_price_range :'',
  in_id_country :'',
  in_id_city :'',
  in_offset:'',
  in_limit:''
}
module.exports = _;
