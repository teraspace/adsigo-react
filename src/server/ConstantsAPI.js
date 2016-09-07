/**
 *
 * @author T. Carlos Manuel Patiño Machado.
 *
 * @since 08 Octubre 2015
 *
 *	Declaración de constantes que documenta lo Procedimientos Almacenados de la API
 */
var _ = {};
_.app_get_sales_dealings = {
  in_user_token :'',
  in_creation_date:'',
  in_date_start:'',
  in_date_end:''
}
_.app_get_user_stock = {
  in_user_token:'',
  in_fk_id_user:0
}
_.appdealings = {
  in_user_token:'',
   in_id_stock : 0,
   in_name :'',
   in_id_city :'',
   in_address:'',
   in_fk_id_user:0,
   in_daily_price :0,
   in_production_price :0,
   in_number_of_arts :0,
   in_date_start :'',
   in_date_end :''
}

// Estandar Prefijo 'APP' + Acción + Entidad-Objeto
_.applogin = {
    in_mail: 'carlosman79@gmail.com',
    in_password: '123456',
    in_language: 'US',
    in_ip_user_host: ''
};
_.appgetavailability = {
  in_user_token :'',
  in_id_stock : -1
};
_.appregister = {
  in_type_user: '',
  in_identification:'',
  in_name: '',
  in_name_company: '',
  in_user_photo:  '',
  in_phone:  '',
  in_address:  '',
  in_email:  '',
  in_password:  '',
  in_type_identification:  '',
  in_id_country:  '',
  in_id_city:  '',
  in_ip_user_host: ''
};
_.appcountry = {

}
_.appgetpricerange = {}
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
