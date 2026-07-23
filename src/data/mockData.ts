export interface Supplier {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  avgDeliveryHours: number;
  location: string;
  minOrder: number;
  established: number;
  description: string;
  brands: string[];
  promotions: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  compatibleWith?: string[];
  image: string;
}

export interface ProductListing {
  id: string;
  productId: string;
  supplierId: string;
  price: number;
  stock: number;
  deliveryHours: number;
  warrantyMonths: number;
  rating: number;
  condition: 'Nuevo' | 'Reacondicionado';
}

export interface Kit {
  id: string;
  name: string;
  description: string;
  image: string;
  items: {
    productName: string;
    category: string;
    quantity: number;
    recommendedBrand: string;
  }[];
}

export const suppliers: Supplier[] = [
  {
    id: 's1',
    name: 'Dental Express Perú',
    logo: 'DX',
    rating: 4.8,
    reviewCount: 340,
    avgDeliveryHours: 24,
    location: 'Miraflores, Lima',
    minOrder: 150,
    established: 2012,
    description: 'Distribuidor líder de materiales odontológicos express en el Perú. Representante oficial de marcas internacionales.',
    brands: ['3M ESPE', 'Coltene', 'Hu-Friedy', 'Maillefer', 'Dentsply Sirona'],
    promotions: ['Envío gratis por compras mayores a S/. 500', '10% de descuento en instrumental de cirugía']
  },
  {
    id: 's2',
    name: 'ProDental Supply',
    logo: 'PD',
    rating: 4.9,
    reviewCount: 290,
    avgDeliveryHours: 12,
    location: 'San Isidro, Lima',
    minOrder: 200,
    established: 2014,
    description: 'Importador directo y servicio integral para clínicas odontológicas premium.',
    brands: ['3M ESPE', 'Angelus', 'SDI', 'Woodpecker', 'W&H', 'NSK'],
    promotions: ['Garantía extendida en autoclaves y equipos', 'Instalación gratis de compresores en Lima']
  },
  {
    id: 's3',
    name: 'DentMarket',
    logo: 'DM',
    rating: 4.6,
    reviewCount: 420,
    avgDeliveryHours: 48,
    location: 'Surco, Lima',
    minOrder: 100,
    established: 2016,
    description: 'Catálogo masivo con los precios más competitivos del mercado odontológico peruano.',
    brands: ['3M ESPE', 'Morelli', 'OrthoClassic', 'BioClean', 'Lascod', 'Zeyco'],
    promotions: ['Descuento de S/. 50 por compras mayores a S/. 600', 'Ofertas en brackets Morelli']
  },
  {
    id: 's4',
    name: 'OdontoImport',
    logo: 'OI',
    rating: 4.5,
    reviewCount: 195,
    avgDeliveryHours: 24,
    location: 'Surquillo, Lima',
    minOrder: 120,
    established: 2015,
    description: 'Especialistas en importación rápida de insumos de operatoria y endodoncia.',
    brands: ['3M ESPE', 'Dentsply Sirona', 'Maillefer', 'Angelus'],
    promotions: ['Envíos garantizados a provincias en 48h', 'Kit de endodoncia con 10% de descuento']
  },
  {
    id: 's5',
    name: 'BioDental',
    logo: 'BD',
    rating: 4.4,
    reviewCount: 150,
    avgDeliveryHours: 36,
    location: 'La Victoria, Lima',
    minOrder: 80,
    established: 2018,
    description: 'Líderes en bioseguridad, desechables y desinfección clínica en Lima.',
    brands: ['BioClean', 'Zeyco', '3M ESPE'],
    promotions: ['Precios de fábrica en cajas de guantes de nitrilo', '5+1 en rollos de esterilización']
  },
  {
    id: 's6',
    name: 'Equipamiento Dental Lima',
    logo: 'ED',
    rating: 4.7,
    reviewCount: 110,
    avgDeliveryHours: 48,
    location: 'San Borja, Lima',
    minOrder: 500,
    established: 2009,
    description: 'Especialistas en equipamiento pesado y tecnología para consultorios dentales.',
    brands: ['Woodpecker', 'W&H', 'NSK', 'Medit'],
    promotions: ['Servicio técnico propio y calibración anual incluida', 'Financiamiento hasta en 12 cuotas']
  },
  {
    id: 's7',
    name: 'EndoSupply',
    logo: 'ES',
    rating: 4.7,
    reviewCount: 185,
    avgDeliveryHours: 24,
    location: 'Lince, Lima',
    minOrder: 150,
    established: 2017,
    description: 'Distribuidor exclusivo de instrumental, localizadores y motores para endodoncistas.',
    brands: ['Maillefer', 'Dentsply Sirona', 'Woodpecker', 'Angelus'],
    promotions: ['Capacitación gratuita en sistemas rotatorios por compras mayores a S/. 1,000']
  },
  {
    id: 's8',
    name: 'OrthoMarket',
    logo: 'OM',
    rating: 4.6,
    reviewCount: 220,
    avgDeliveryHours: 24,
    location: 'Ate, Lima',
    minOrder: 150,
    established: 2013,
    description: 'Todo lo que el ortodoncista necesita: brackets, arcos, bandas, adhesivos y accesorios.',
    brands: ['Morelli', 'OrthoClassic', '3M ESPE'],
    promotions: ['Brackets Morelli 4+1 gratis', 'Envío gratis en Lima por compras mayores a S/. 300']
  },
  {
    id: 's9',
    name: 'Implant Perú',
    logo: 'IP',
    rating: 4.9,
    reviewCount: 95,
    avgDeliveryHours: 24,
    location: 'San Isidro, Lima',
    minOrder: 300,
    established: 2011,
    description: 'Distribuidor oficial de implantes de alta gama, motores quirúrgicos y biomateriales.',
    brands: ['Morelli', 'W&H', 'Dentsply Sirona'],
    promotions: ['Garantía de por vida en implantes cono morse', 'Descuento del 15% en motores quirúrgicos']
  },
  {
    id: 's10',
    name: 'Clínica Supply',
    logo: 'CS',
    rating: 4.3,
    reviewCount: 130,
    avgDeliveryHours: 36,
    location: 'Chorrillos, Lima',
    minOrder: 100,
    established: 2019,
    description: 'Consumibles odontológicos de alta rotación al mejor costo para clínicas medianas y grandes.',
    brands: ['BioClean', 'Terumo', 'Lascod', 'Zeyco'],
    promotions: ['Precios especiales por volumen de compra mensual']
  }
];

export const products: Product[] = [
  // 1. OPERATORIA
  {
    id: 'p1',
    name: 'Resina Filtek Z350 XT Body A2',
    category: 'Operatoria',
    brand: '3M ESPE',
    description: 'Resina compuesta restauradora universal con tecnología de nano-relleno. Estética excepcional para anteriores y resistencia para posteriores.',
    specifications: {
      'Presentación': 'Jeringa de 4g',
      'Tipo de Relleno': 'Nanotecnología (100% nanopartículas)',
      'Tiempo de Fotocurado': '20 segundos por capa'
    },
    compatibleWith: ['Adhesivo Single Bond Universal', 'Lámpara de Fotocurado Led Valo Grand'],
    image: 'resina_filtek'
  },
  {
    id: 'p2',
    name: 'Resina Filtek Z250 Microval A2',
    category: 'Operatoria',
    brand: '3M ESPE',
    description: 'Restaurador estético microhíbrido de resina compuesta. Ideal para restauraciones anteriores y posteriores con bajo índice de contracción.',
    specifications: {
      'Presentación': 'Jeringa de 4g',
      'Tipo de Relleno': 'Microhíbrido',
      'Tiempo de Fotocurado': '30 segundos'
    },
    compatibleWith: ['Adhesivo Single Bond Universal', 'Lámpara de Fotocurado Led-D'],
    image: 'resina_filtek_z250'
  },
  {
    id: 'p3',
    name: 'Adhesivo Single Bond Universal',
    category: 'Operatoria',
    brand: '3M ESPE',
    description: 'Adhesivo dental monocomponente compatible con grabado total, autocondicionante y selectivo.',
    specifications: {
      'Presentación': 'Frasco de 5ml',
      'Generación': '8va Generación (Universal)',
      'Refrigeración': 'No requiere'
    },
    image: 'adhesivo_single_bond'
  },
  {
    id: 'p4',
    name: 'Lámpara de Fotocurado Led-D',
    category: 'Operatoria',
    brand: 'Woodpecker',
    description: 'Lámpara de fotocurado inalámbrica de alta potencia, con pantalla digital y 4 modos de tiempo.',
    specifications: {
      'Intensidad': '850 - 1000 mW/cm²',
      'Espectro': '420 - 480 nm',
      'Batería': 'Recargable Litio-Ion'
    },
    image: 'lampara_led_d'
  },
  {
    id: 'p5',
    name: 'Lámpara de Fotocurado Led Valo Grand',
    category: 'Operatoria',
    brand: '3M ESPE',
    description: 'Lámpara de fotocurado de amplio espectro premium. Su cabezal de perfil bajo y lente de 12 mm permiten un acceso fácil a posteriores.',
    specifications: {
      'Intensidad': 'Hasta 3200 mW/cm²',
      'Espectro': '385 - 515 nm',
      'Material': 'Aluminio aeroespacial'
    },
    image: 'lampara_valo'
  },
  {
    id: 'p29',
    name: 'Resina Tokuyama Omnichroma',
    category: 'Operatoria',
    brand: 'Coltene',
    description: 'La primera resina compuesta universal del mundo que iguala clínicamente cualquier color de diente con una sola jeringa.',
    specifications: {
      'Presentación': 'Jeringa de 4g',
      'Tecnología': 'Smart Chromatic Technology',
      'Color': 'Universal (A1-D4)'
    },
    compatibleWith: ['Adhesivo Single Bond Universal'],
    image: 'resina_omnichroma'
  },
  {
    id: 'p30',
    name: 'Resina Ultradent Forma',
    category: 'Operatoria',
    brand: 'Coltene',
    description: 'Resina compuesta nanohíbrida con excelente balance estético y facilidad de pulido.',
    specifications: {
      'Presentación': 'Jeringa de 4g',
      'Tipo': 'Nanohíbrido',
      'Origen': 'USA'
    },
    image: 'resina_forma'
  },
  {
    id: 'p31',
    name: 'Grabador Ácido Ultra-Etch',
    category: 'Operatoria',
    brand: 'Coltene',
    description: 'Gel grabador de ácido fosfórico al 35% con propiedades de autolimitación de profundidad de grabado.',
    specifications: {
      'Concentración': '35% Ácido Fosfórico',
      'Presentación': 'Jeringa de 1.2ml',
      'Color': 'Azul cobalto'
    },
    image: 'acido_ultra_etch'
  },

  // 2. ENDODONCIA
  {
    id: 'p6',
    name: 'Limas Rotatorias ProTaper Gold F2 (25mm)',
    category: 'Endodoncia',
    brand: 'Maillefer',
    description: 'Limas de endodoncia rotatorias de níquel-titanio termotratadas de flexibilidad avanzada.',
    specifications: {
      'Material': 'Níquel-Titanio termotratado Gold',
      'Longitud': '25 mm',
      'Calibre': 'F2 (25/.08)'
    },
    compatibleWith: ['Motor de Endodoncia Endo Radar Plus', 'Localizador de Ápices Woodpex III Plus'],
    image: 'limas_protaper'
  },
  {
    id: 'p7',
    name: 'Localizador de Ápices Woodpex III Plus',
    category: 'Endodoncia',
    brand: 'Woodpecker',
    description: 'Localizador electrónico de ápices de alta precisión con pantalla LCD a color de 4.5 pulgadas.',
    specifications: {
      'Precisión': '97.71%',
      'Pantalla': '4.5" LCD a color',
      'Alimentación': 'Batería de Litio recargable'
    },
    image: 'localizador_woodpex'
  },
  {
    id: 'p8',
    name: 'Motor de Endodoncia Endo Radar Plus',
    category: 'Endodoncia',
    brand: 'Woodpecker',
    description: 'Motor de endodoncia inalámbrico premium con localizador de ápices integrado y pantalla táctil.',
    specifications: {
      'Torque': '0.4 - 5.0 N.cm',
      'Velocidad': '100 - 1200 rpm',
      'Modos': 'Rotación continua, Reciprocante, Autoreversa'
    },
    compatibleWith: ['Limas Rotatorias ProTaper Gold F2 (25mm)'],
    image: 'motor_endo_radar'
  },
  {
    id: 'p9',
    name: 'Cemento Sellador AH Plus Jet',
    category: 'Endodoncia',
    brand: 'Dentsply Sirona',
    description: 'Sellador de conductos radiculares a base de resina epóxica-amina. Excelente radiopacidad y sellado hermético.',
    specifications: {
      'Presentación': 'Jeringa de mezcla doble de 15g',
      'Base': 'Resina epoxi-amina',
      'Radiopacidad': '13.6 mm/Al'
    },
    image: 'cemento_ah_plus'
  },
  {
    id: 'p10',
    name: 'Conos de Gutapercha ProTaper Gold F2',
    category: 'Endodoncia',
    brand: 'Dentsply Sirona',
    description: 'Puntas de gutapercha calibradas para coincidir exactamente con la conicidad de las limas rotatorias ProTaper Gold.',
    specifications: {
      'Calibre': 'F2 (25/.08)',
      'Presentación': 'Caja x 60 puntas'
    },
    image: 'gutapercha_protaper'
  },
  {
    id: 'p11',
    name: 'Hipoclorito de Sodio al 5.25%',
    category: 'Endodoncia',
    brand: 'BioClean',
    description: 'Solución irrigadora dental indicada para desinfección y lavado químico de los conductos radiculares.',
    specifications: {
      'Concentración': '5.25%',
      'Presentación': 'Envase de 1 Litro'
    },
    image: 'hipoclorito_sodio'
  },
  {
    id: 'p12',
    name: 'Dique de Goma Nic Tone Azul',
    category: 'Endodoncia',
    brand: 'Coltene',
    description: 'Diques de hule de látex natural de bajo polvo para el aislamiento absoluto del campo operatorio.',
    specifications: {
      'Medida': '6x6 pulgadas',
      'Presentación': 'Caja de 36 diques',
      'Espesor': 'Medio (Medium)'
    },
    image: 'dique_nic_tone'
  },
  {
    id: 'p32',
    name: 'Cemento MTA Repair HP',
    category: 'Endodoncia',
    brand: 'Angelus',
    description: 'Cemento biocerámico reparador de alta plasticidad. Indicado para perforaciones, reabsorciones y sellado apical.',
    specifications: {
      'Presentación': 'Caja con 5 cápsulas de 0.085g + líquido',
      'Radiopacidad': 'Alta',
      'Tiempo de fraguado': '15 minutos'
    },
    image: 'mta_angelus'
  },
  {
    id: 'p33',
    name: 'Localizador de Ápices iPex II',
    category: 'Endodoncia',
    brand: 'NSK',
    description: 'Localizador de ápices digital ultra-preciso con tecnología Smart Logic de multi-frecuencia.',
    specifications: {
      'Pantalla': 'LCD retroiluminada de 3 colores',
      'Precisión': '98.2%',
      'Garantía': '12 meses'
    },
    image: 'ipex_nsk'
  },

  // 3. ORTODONCIA
  {
    id: 'p13',
    name: 'Brackets Metálicos Roth .022',
    category: 'Ortodoncia',
    brand: 'Morelli',
    description: 'Brackets de ortodoncia metálicos de bajo perfil con base de malla arenada para máxima adhesión.',
    specifications: {
      'Prescripción': 'Roth',
      'Slot': '0.022"',
      'Presentación': 'Caso completo 5x5 (20 unidades)'
    },
    image: 'brackets_metalicos'
  },
  {
    id: 'p14',
    name: 'Arcos de Nitinol Redondos .014 Superelásticos',
    category: 'Ortodoncia',
    brand: 'OrthoClassic',
    description: 'Arcos de ortodoncia de níquel-titanio superelásticos para alineación y nivelación inicial.',
    specifications: {
      'Diámetro': '0.014"',
      'Forma': 'Ovoide estándar',
      'Presentación': 'Paquete de 10 unidades'
    },
    image: 'arcos_nitinol'
  },
  {
    id: 'p34',
    name: 'Tubos Bucales de Cementación Simple Molar',
    category: 'Ortodoncia',
    brand: 'Morelli',
    description: 'Tubos bucales de cementación directa para primeros molares. Base anatómica arenada.',
    specifications: {
      'Slot': '0.022"',
      'Presentación': 'Kit x 4 unidades (UR, UL, LR, LL)',
      'Técnica': 'Roth'
    },
    image: 'tubos_morelli'
  },
  {
    id: 'p35',
    name: 'Elásticos Intermaxilares 1/8 Medio',
    category: 'Ortodoncia',
    brand: 'OrthoClassic',
    description: 'Elásticos de látex quirúrgico para corrección intermaxilar de ortodoncia. Fuerza constante y controlada.',
    specifications: {
      'Medida': '1/8 pulgadas (3.2 mm)',
      'Fuerza': 'Medio (3.5 oz / 100g)',
      'Presentación': 'Bolsa de 100 unidades'
    },
    image: 'elasticos_orthoclassic'
  },
  {
    id: 'p36',
    name: 'Adhesivo Transbond XT para Brackets',
    category: 'Ortodoncia',
    brand: '3M ESPE',
    description: 'Adhesivo fotocurable premium para cementación de brackets metálicos y cerámicos. Excelente adhesión inicial.',
    specifications: {
      'Presentación': 'Jeringa de 4g',
      'Tipo': 'Fotopolimerizable',
      'Viscosidad': 'Media'
    },
    image: 'transbond_3m'
  },

  // 4. CIRUGÍA
  {
    id: 'p24',
    name: 'Fórceps Dental Hu-Friedy #150 Universal',
    category: 'Cirugía',
    brand: 'Hu-Friedy',
    description: 'Fórceps dental universal de extracción premium para premolares, incisivos y raíces superiores.',
    specifications: {
      'Material': 'Acero inoxidable quirúrgico Immunity Steel',
      'Uso': 'Extracción de superiores'
    },
    image: 'forceps_hu_friedy'
  },
  {
    id: 'p25',
    name: 'Elevador de Raíces Recto Fino #301',
    category: 'Cirugía',
    brand: 'Hu-Friedy',
    description: 'Instrumental para luxación dental recto con mango ergonómico. Punta delgada de 2.5mm.',
    specifications: {
      'Punta': 'Recta de 2.5 mm',
      'Mango': 'Liso redondo macizo'
    },
    image: 'elevador_hu_friedy'
  },
  {
    id: 'p37',
    name: 'Hilo de Sutura Seda Negra 3-0',
    category: 'Cirugía',
    brand: 'BioClean',
    description: 'Sutura no absorbible de seda negra multifilamento con aguja cortante reversa de 3/8 de círculo.',
    specifications: {
      'Grosor': '3-0 (USP)',
      'Longitud de Hilo': '75 cm',
      'Presentación': 'Caja con 12 suturas estériles'
    },
    image: 'seda_negra_sutura'
  },
  {
    id: 'p38',
    name: 'Mango de Bisturí #3 con 10 Hojas #15',
    category: 'Cirugía',
    brand: 'Hu-Friedy',
    description: 'Mango para bisturí estándar número 3 con juego de 10 hojas desechables de acero al carbono número 15.',
    specifications: {
      'Mango': '#3 plano de acero inoxidable',
      'Hojas': '#15 estériles desechables'
    },
    image: 'bisturi_hu_friedy'
  },
  {
    id: 'p39',
    name: 'Jeringa Cárpule de Aspiración Astra',
    category: 'Cirugía',
    brand: 'Hu-Friedy',
    description: 'Jeringa tipo cárpule para anestesia dental local con arpón autodesconectable de aspiración.',
    specifications: {
      'Material': 'Acero inoxidable premium',
      'Tipo de aguja': 'Universal a rosca'
    },
    image: 'carpule_hu_friedy'
  },

  // 5. IMPLANTOLOGÍA
  {
    id: 'p26',
    name: 'Implante Dental Titanio Cono Morse Alvim',
    category: 'Implantología',
    brand: 'Morelli',
    description: 'Implante dental de titanio grado 4 con superficie tratada y conexión de cono morse de alta estabilidad.',
    specifications: {
      'Material': 'Titanio Grado 4',
      'Conexión': 'Cono Morse (11.5°)',
      'Medidas': '3.75 mm x 11.5 mm'
    },
    image: 'implante_titanio'
  },
  {
    id: 'p40',
    name: 'Pilar Cicatrizal Cono Morse',
    category: 'Implantología',
    brand: 'Morelli',
    description: 'Pilar de cicatrización de titanio para implantes de conexión cono morse.',
    specifications: {
      'Altura transmucosa': '3.5 mm',
      'Material': 'Titanio Grado 5'
    },
    image: 'cicatrizal_morelli'
  },
  {
    id: 'p41',
    name: 'Transfer de Impresión Cono Morse Cubeta Abierta',
    category: 'Implantología',
    brand: 'Morelli',
    description: 'Transfer de impresión para implantes de cono morse para técnica de cubeta abierta.',
    specifications: {
      'Tipo': 'Cubeta Abierta',
      'Incluye': 'Tornillo de fijación largo'
    },
    image: 'transfer_impresion'
  },
  {
    id: 'p42',
    name: 'Motor Quirúrgico Implantmed Classic',
    category: 'Implantología',
    brand: 'W&H',
    description: 'Motor para implantología y cirugía maxilofacial de alta precisión, torque máximo de 80 N.cm y bomba de irrigación integrada.',
    specifications: {
      'Torque Máximo': '80 N.cm',
      'Alimentación bomba': '0-100 ml/min de suero fisiológico',
      'Pedal': 'Inalámbrico programable'
    },
    image: 'implantmed_wh'
  },

  // 6. BIOSEGURIDAD
  {
    id: 'p16',
    name: 'Guantes de Nitrilo BioClean (Caja x 100)',
    category: 'Bioseguridad',
    brand: 'BioClean',
    description: 'Guantes de examen de nitrilo color azul, libres de polvo y látex. Excelente resistencia a pinchazos.',
    specifications: {
      'Material': 'Nitrilo sintético 100%',
      'Talla': 'M',
      'Presentación': 'Caja de 100 unidades'
    },
    image: 'guantes_nitrilo'
  },
  {
    id: 'p17',
    name: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)',
    category: 'Bioseguridad',
    brand: 'BioClean',
    description: 'Mascarillas de protección facial con triple capa de filtración bacteriana y ajuste elástico.',
    specifications: {
      'Filtración BFE': '>= 98%',
      'Capa': "Triple no tejido"
    },
    image: 'mascarillas_3pliegues'
  },
  {
    id: 'p43',
    name: 'Jabón Antiséptico Germikil',
    category: 'Bioseguridad',
    brand: 'BioClean',
    description: 'Jabón líquido antiséptico para el lavado clínico de manos con gluconato de clorhexidina al 2%.',
    specifications: {
      'Activo': 'Clorhexidina 2%',
      'Presentación': 'Galón de 3.8 Litros',
      'PH': 'Neutro'
    },
    image: 'jabon_clorhexidina'
  },
  {
    id: 'p44',
    name: 'Lentes de Protección Dental Anti-Empañantes',
    category: 'Bioseguridad',
    brand: 'BioClean',
    description: 'Gafas protectoras de policarbonato con tratamiento anti-rayaduras y anti-empañamiento para el operador dental.',
    specifications: {
      'Material': 'Policarbonato de alta resistencia',
      'Certificación': 'ANSI Z87.1'
    },
    image: 'lentes_proteccion'
  },

  // 7. INSTRUMENTAL
  {
    id: 'p45',
    name: 'Espejo Dental #5 de Rodio con Mango',
    category: 'Instrumental',
    brand: 'Hu-Friedy',
    description: 'Espejo bucal plano número 5 con recubrimiento de rodio en la superficie para una imagen libre de distorsiones. Incluye mango ergonómico de acero satinado.',
    specifications: {
      'Espejo': 'Plano de Rodio de superficie frontal #5',
      'Mango': 'Rosca estándar Cone Socket'
    },
    image: 'espejo_hu_friedy'
  },
  {
    id: 'p46',
    name: 'Sonda Exploradora Doble #5',
    category: 'Instrumental',
    brand: 'Hu-Friedy',
    description: 'Explorador dental de doble extremo extremo número 5 de alta sensibilidad táctil.',
    specifications: {
      'Modelo': 'DG16/5',
      'Mango': 'Acero inoxidable texturizado octagonal'
    },
    image: 'sonda_exploradora'
  },
  {
    id: 'p47',
    name: 'Pinza Algodonera College',
    category: 'Instrumental',
    brand: 'Hu-Friedy',
    description: 'Pinza para algodón College con puntas estriadas para sujeción firme. Fabricada con acero Immunity.',
    specifications: {
      'Tipo': 'College angulada',
      'Material': 'Acero Immunity'
    },
    image: 'pinza_algodonera'
  },
  {
    id: 'p48',
    name: 'Cucharilla de Dentina Doble Mediana',
    category: 'Instrumental',
    brand: 'Hu-Friedy',
    description: 'Cucharilla para excavar dentina doble, mediana, con hojas cortantes afiladas en los extremos.',
    specifications: {
      'Modelo': '#18 de doble extremo',
      'Función': 'Remoción manual de caries'
    },
    image: 'cucharilla_dentina'
  },

  // 8. EQUIPAMIENTO
  {
    id: 'p20',
    name: 'Turbina Dental Alegra TE-97 (B2)',
    category: 'Equipamiento',
    brand: 'W&H',
    description: 'Pieza de mano de alta velocidad con baleros cerámicos, triple spray de refrigeración y conexión Borden de 2 vías.',
    specifications: {
      'Conexión': 'Borden de 2 vías (B2)',
      'Cabezal': 'Estándar',
      'Rodamientos': 'Cerámicos de alta duración'
    },
    image: 'turbina_wh'
  },
  {
    id: 'p21',
    name: 'Micromotor Eléctrico Strong 204',
    category: 'Equipamiento',
    brand: 'Woodpecker',
    description: 'Equipo de micromotor de mesa con pieza de mano para laboratorio dental y pulido clínico.',
    specifications: {
      'Velocidad': '35,000 RPM',
      'Torque': '2.8 N.cm',
      'Pedal': 'On/Off incluido'
    },
    image: 'micromotor_strong'
  },
  {
    id: 'p19',
    name: 'Compresora Dental Libre de Aceite 1.5 HP',
    category: 'Equipamiento',
    brand: 'Woodpecker',
    description: 'Compresora de aire para unidades dentales silenciosa y libre de mantenimiento de aceite.',
    specifications: {
      'Potencia': '1.5 HP (1100W)',
      'Tanque': '40 Litros',
      'Nivel de Ruido': '55 dB'
    },
    image: 'compresora_1_5hp'
  },
  {
    id: 'p49',
    name: 'Ultrasonido Dental Piezoeléctrico UDS-J',
    category: 'Equipamiento',
    brand: 'Woodpecker',
    description: 'Limpiador ultrasónico piezoeléctrico de profilaxis con pieza de mano desmontable y 5 puntas incluidas.',
    specifications: {
      'Pieza de mano': 'Desmontable esterilizable',
      'Modos': 'Limpieza y Periodoncia',
      'Frecuencia': '28 kHz'
    },
    image: 'ultrasonido_woodpecker'
  },

  // 9. ESTERILIZACIÓN
  {
    id: 'p15',
    name: 'Autoclave Digital 21 Litros Clase B',
    category: 'Esterilización',
    brand: 'Woodpecker',
    description: 'Esterilizador a vapor clase B para instrumental hueco y textil, pantalla digital y puerto USB.',
    specifications: {
      'Capacidad': '21 Litros',
      'Clase': 'Clase B',
      'Temperatura': '121°C y 134°C'
    },
    image: 'autoclave_21l'
  },
  {
    id: 'p50',
    name: 'Selladora Térmica de Bolsas de Esterilización',
    category: 'Esterilización',
    brand: 'Woodpecker',
    description: 'Selladora térmica rotativa para mangas de esterilización con control de temperatura de sellado constante.',
    specifications: {
      'Ancho de Sellado': '10 mm',
      'Ancho de Manga Máximo': '250 mm',
      'Potencia': '500W'
    },
    image: 'selladora_esterilizacion'
  },
  {
    id: 'p51',
    name: 'Rollos de Manga para Esterilización 10cm x 200m',
    category: 'Esterilización',
    brand: 'BioClean',
    description: 'Rollos de manga mixta (papel grado médico + film plástico) para empaquetado de instrumental y autoclave.',
    specifications: {
      'Medidas': '10 cm x 200 metros',
      'Indicadores': 'Vapor y Gas Óxido de Etileno',
      'Material': 'Papel de 60g'
    },
    image: 'manga_esterilización'
  },
  {
    id: 'p52',
    name: 'Indicador Integrador Químico Clase 5',
    category: 'Esterilización',
    brand: 'BioClean',
    description: 'Indicadores químicos integradores que evalúan las variables críticas del ciclo de vapor (tiempo, temp, vapor saturado).',
    specifications: {
      'Clase': 'Clase 5 Integrador',
      'Presentación': 'Caja con 250 tiras reactivas'
    },
    image: 'indicador_clase_5'
  },

  // 10. ODONTOLOGÍA DIGITAL
  {
    id: 'p18',
    name: 'Escáner Intraoral Medit i700',
    category: 'Odontología digital',
    brand: 'Medit',
    description: 'Escáner intraoral digital de alta velocidad con tecnología de escaneo 3D a color para prótesis y ortodoncia.',
    specifications: {
      'Peso': '245 gramos',
      'Conectividad': 'Cable USB 3.0 tipo C direct-connect',
      'Software': 'Medit Link incluido (libre de licencias anuales)'
    },
    image: 'escaner_medit'
  },
  {
    id: 'p53',
    name: 'Resina Impresión 3D Temporal Crown y Bridge',
    category: 'Odontología digital',
    brand: 'Medit',
    description: 'Resina fotopolimerizable biocompatible para impresión 3D de coronas temporales, puentes y carillas dentales.',
    specifications: {
      'Longitud de onda': '405 nm',
      'Presentación': 'Botella de 1 Litro',
      'Color': 'A2'
    },
    image: 'resina_3d_medit'
  }
];

export const listings: ProductListing[] = [
  // Resina Filtek Z350 XT A2 (p1)
  { id: 'l1_1', productId: 'p1', supplierId: 's1', price: 145.00, stock: 25, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l1_2', productId: 'p1', supplierId: 's3', price: 139.00, stock: 12, deliveryHours: 48, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l1_3', productId: 'p1', supplierId: 's2', price: 152.00, stock: 35, deliveryHours: 12, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l1_4', productId: 'p1', supplierId: 's10', price: 142.00, stock: 8, deliveryHours: 36, warrantyMonths: 0, rating: 4.1, condition: 'Nuevo' },

  // Resina Filtek Z250 (p2)
  { id: 'l2_1', productId: 'p2', supplierId: 's1', price: 120.00, stock: 20, deliveryHours: 24, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },
  { id: 'l2_2', productId: 'p2', supplierId: 's3', price: 115.00, stock: 50, deliveryHours: 48, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },
  { id: 'l2_3', productId: 'p2', supplierId: 's10', price: 118.00, stock: 3, deliveryHours: 36, warrantyMonths: 0, rating: 4.0, condition: 'Nuevo' },

  // Adhesivo Single Bond (p3)
  { id: 'l3_1', productId: 'p3', supplierId: 's1', price: 185.00, stock: 15, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l3_2', productId: 'p3', supplierId: 's2', price: 190.00, stock: 20, deliveryHours: 12, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l3_3', productId: 'p3', supplierId: 's3', price: 178.00, stock: 40, deliveryHours: 48, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },

  // Lámpara Led-D (p4)
  { id: 'l4_1', productId: 'p4', supplierId: 's2', price: 290.00, stock: 8, deliveryHours: 12, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },
  { id: 'l4_2', productId: 'p4', supplierId: 's6', price: 270.00, stock: 15, deliveryHours: 48, warrantyMonths: 24, rating: 4.7, condition: 'Nuevo' },
  { id: 'l4_3', productId: 'p4', supplierId: 's3', price: 260.00, stock: 3, deliveryHours: 48, warrantyMonths: 6, rating: 4.3, condition: 'Nuevo' },

  // Lámpara Valo Grand (p5)
  { id: 'l5_1', productId: 'p5', supplierId: 's1', price: 3450.00, stock: 3, deliveryHours: 24, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },
  { id: 'l5_2', productId: 'p5', supplierId: 's2', price: 3390.00, stock: 5, deliveryHours: 12, warrantyMonths: 24, rating: 5.0, condition: 'Nuevo' },

  // Resina Tokuyama Omnichroma (p29)
  { id: 'l29_1', productId: 'p29', supplierId: 's1', price: 165.00, stock: 12, deliveryHours: 24, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },
  { id: 'l29_2', productId: 'p29', supplierId: 's3', price: 158.00, stock: 30, deliveryHours: 48, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },

  // Resina Ultradent Forma (p30)
  { id: 'l30_1', productId: 'p30', supplierId: 's1', price: 135.00, stock: 15, deliveryHours: 24, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },
  { id: 'l30_2', productId: 'p30', supplierId: 's3', price: 129.00, stock: 25, deliveryHours: 48, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },

  // Grabador Ácido (p31)
  { id: 'l31_1', productId: 'p31', supplierId: 's1', price: 42.00, stock: 80, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l31_2', productId: 'p31', supplierId: 's3', price: 38.00, stock: 150, deliveryHours: 48, warrantyMonths: 0, rating: 4.3, condition: 'Nuevo' },

  // Limas ProTaper Gold (p6)
  { id: 'l6_1', productId: 'p6', supplierId: 's7', price: 245.00, stock: 40, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l6_2', productId: 'p6', supplierId: 's1', price: 260.00, stock: 15, deliveryHours: 24, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },
  { id: 'l6_3', productId: 'p6', supplierId: 's4', price: 250.00, stock: 22, deliveryHours: 24, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },

  // Localizador Woodpex (p7)
  { id: 'l7_1', productId: 'p7', supplierId: 's7', price: 920.00, stock: 8, deliveryHours: 24, warrantyMonths: 18, rating: 4.8, condition: 'Nuevo' },
  { id: 'l7_2', productId: 'p7', supplierId: 's6', price: 950.00, stock: 10, deliveryHours: 48, warrantyMonths: 24, rating: 4.7, condition: 'Nuevo' },

  // Motor Endo Radar (p8)
  { id: 'l8_1', productId: 'p8', supplierId: 's6', price: 2850.00, stock: 4, deliveryHours: 48, warrantyMonths: 24, rating: 4.8, condition: 'Nuevo' },
  { id: 'l8_2', productId: 'p8', supplierId: 's7', price: 2890.00, stock: 6, deliveryHours: 24, warrantyMonths: 18, rating: 4.9, condition: 'Nuevo' },

  // AH Plus (p9)
  { id: 'l9_1', productId: 'p9', supplierId: 's7', price: 460.00, stock: 15, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l9_2', productId: 'p9', supplierId: 's4', price: 475.00, stock: 5, deliveryHours: 24, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },

  // Gutapercha (p10)
  { id: 'l10_1', productId: 'p10', supplierId: 's7', price: 52.00, stock: 60, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l10_2', productId: 'p10', supplierId: 's3', price: 50.00, stock: 100, deliveryHours: 48, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },

  // Hipoclorito (p11)
  { id: 'l11_1', productId: 'p11', supplierId: 's5', price: 32.00, stock: 80, deliveryHours: 36, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l11_2', productId: 'p11', supplierId: 's10', price: 30.00, stock: 120, deliveryHours: 36, warrantyMonths: 0, rating: 4.2, condition: 'Nuevo' },

  // Dique de Goma (p12)
  { id: 'l12_1', productId: 'p12', supplierId: 's1', price: 92.05, stock: 30, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l12_2', productId: 'p12', supplierId: 's3', price: 88.00, stock: 70, deliveryHours: 48, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },

  // Cemento MTA (p32)
  { id: 'l32_1', productId: 'p32', supplierId: 's7', price: 390.00, stock: 10, deliveryHours: 24, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },

  // Localizador iPex II (p33)
  { id: 'l33_1', productId: 'p33', supplierId: 's6', price: 1850.00, stock: 5, deliveryHours: 48, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },

  // Brackets Roth (p13)
  { id: 'l13_1', productId: 'p13', supplierId: 's8', price: 175.00, stock: 50, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l13_2', productId: 'p13', supplierId: 's3', price: 170.00, stock: 80, deliveryHours: 48, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },

  // Arcos Nitinol (p14)
  { id: 'l14_1', productId: 'p14', supplierId: 's8', price: 62.00, stock: 100, deliveryHours: 24, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },
  { id: 'l14_2', productId: 'p14', supplierId: 's3', price: 58.00, stock: 200, deliveryHours: 48, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },

  // Tubos bucales (p34)
  { id: 'l34_1', productId: 'p34', supplierId: 's8', price: 85.00, stock: 40, deliveryHours: 24, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },

  // Elasticos (p35)
  { id: 'l35_1', productId: 'p35', supplierId: 's8', price: 38.00, stock: 150, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },

  // Transbond XT (p36)
  { id: 'l36_1', productId: 'p36', supplierId: 's8', price: 290.00, stock: 15, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l36_2', productId: 'p36', supplierId: 's3', price: 280.00, stock: 20, deliveryHours: 48, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },

  // Fórceps #150 (p24)
  { id: 'l24_1', productId: 'p24', supplierId: 's1', price: 380.00, stock: 10, deliveryHours: 24, warrantyMonths: 12, rating: 4.9, condition: 'Nuevo' },
  { id: 'l24_2', productId: 'p24', supplierId: 's2', price: 395.00, stock: 5, deliveryHours: 12, warrantyMonths: 24, rating: 5.0, condition: 'Nuevo' },

  // Elevador Recto (p25)
  { id: 'l25_1', productId: 'p25', supplierId: 's1', price: 190.00, stock: 15, deliveryHours: 24, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },
  { id: 'l25_2', productId: 'p25', supplierId: 's3', price: 175.00, stock: 30, deliveryHours: 48, warrantyMonths: 12, rating: 4.4, condition: 'Nuevo' },

  // Hilo de sutura (p37)
  { id: 'l37_1', productId: 'p37', supplierId: 's5', price: 48.00, stock: 100, deliveryHours: 36, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l37_2', productId: 'p37', supplierId: 's10', price: 44.00, stock: 150, deliveryHours: 36, warrantyMonths: 0, rating: 4.2, condition: 'Nuevo' },

  // Mango Bisturí (p38)
  { id: 'l38_1', productId: 'p38', supplierId: 's1', price: 95.00, stock: 20, deliveryHours: 24, warrantyMonths: 6, rating: 4.8, condition: 'Nuevo' },

  // Jeringa carpule (p39)
  { id: 'l39_1', productId: 'p39', supplierId: 's1', price: 165.00, stock: 15, deliveryHours: 24, warrantyMonths: 12, rating: 4.9, condition: 'Nuevo' },

  // Implante Titanio (p26)
  { id: 'l26_1', productId: 'p26', supplierId: 's9', price: 420.00, stock: 50, deliveryHours: 24, warrantyMonths: 60, rating: 4.9, condition: 'Nuevo' },
  { id: 'l26_2', productId: 'p26', supplierId: 's4', price: 440.00, stock: 10, deliveryHours: 24, warrantyMonths: 12, rating: 4.6, condition: 'Nuevo' },

  // Pilar cicatrizal (p40)
  { id: 'l40_1', productId: 'p40', supplierId: 's9', price: 95.00, stock: 100, deliveryHours: 24, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },

  // Transfer impresión (p41)
  { id: 'l41_1', productId: 'p41', supplierId: 's9', price: 110.00, stock: 80, deliveryHours: 24, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },

  // Motor quirúrgico (p42)
  { id: 'l42_1', productId: 'p42', supplierId: 's9', price: 9500.00, stock: 3, deliveryHours: 24, warrantyMonths: 24, rating: 5.0, condition: 'Nuevo' },
  { id: 'l42_2', productId: 'p42', supplierId: 's6', price: 9200.00, stock: 2, deliveryHours: 48, warrantyMonths: 24, rating: 4.8, condition: 'Nuevo' },

  // Guantes de Nitrilo (p16)
  { id: 'l16_1', productId: 'p16', supplierId: 's5', price: 24.50, stock: 600, deliveryHours: 36, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },
  { id: 'l16_2', productId: 'p16', supplierId: 's10', price: 23.90, stock: 1000, deliveryHours: 36, warrantyMonths: 0, rating: 4.3, condition: 'Nuevo' },
  { id: 'l16_3', productId: 'p16', supplierId: 's1', price: 28.00, stock: 150, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },

  // Mascarillas (p17)
  { id: 'l17_1', productId: 'p17', supplierId: 's5', price: 8.50, stock: 1200, deliveryHours: 36, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l17_2', productId: 'p17', supplierId: 's10', price: 7.90, stock: 2000, deliveryHours: 36, warrantyMonths: 0, rating: 4.2, condition: 'Nuevo' },

  // Jabon Antiseptico (p43)
  { id: 'l43_1', productId: 'p43', supplierId: 's5', price: 65.00, stock: 50, deliveryHours: 36, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },

  // Lentes protectoras (p44)
  { id: 'l44_1', productId: 'p44', supplierId: 's5', price: 35.00, stock: 40, deliveryHours: 36, warrantyMonths: 12, rating: 4.7, condition: 'Nuevo' },

  // Espejo Dental (p45)
  { id: 'l45_1', productId: 'p45', supplierId: 's1', price: 45.00, stock: 100, deliveryHours: 24, warrantyMonths: 6, rating: 4.9, condition: 'Nuevo' },
  { id: 'l45_2', productId: 'p45', supplierId: 's2', price: 48.00, stock: 80, deliveryHours: 12, warrantyMonths: 12, rating: 5.0, condition: 'Nuevo' },

  // Sonda exploradora (p46)
  { id: 'l46_1', productId: 'p46', supplierId: 's1', price: 38.00, stock: 120, deliveryHours: 24, warrantyMonths: 6, rating: 4.8, condition: 'Nuevo' },

  // Pinza algodonera (p47)
  { id: 'l47_1', productId: 'p47', supplierId: 's1', price: 48.00, stock: 90, deliveryHours: 24, warrantyMonths: 6, rating: 4.8, condition: 'Nuevo' },

  // Cucharilla dentina (p48)
  { id: 'l48_1', productId: 'p48', supplierId: 's1', price: 55.00, stock: 70, deliveryHours: 24, warrantyMonths: 6, rating: 4.9, condition: 'Nuevo' },

  // Turbina TE-97 (p20)
  { id: 'l20_1', productId: 'p20', supplierId: 's6', price: 820.00, stock: 15, deliveryHours: 48, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },
  { id: 'l20_2', productId: 'p20', supplierId: 's2', price: 850.00, stock: 8, deliveryHours: 12, warrantyMonths: 12, rating: 4.9, condition: 'Nuevo' },

  // Micromotor 204 (p21)
  { id: 'l21_1', productId: 'p21', supplierId: 's6', price: 390.00, stock: 10, deliveryHours: 48, warrantyMonths: 6, rating: 4.4, condition: 'Nuevo' },
  { id: 'l21_2', productId: 'p21', supplierId: 's2', price: 430.00, stock: 12, deliveryHours: 12, warrantyMonths: 12, rating: 4.7, condition: 'Nuevo' },

  // Compresora 1.5HP (p19)
  { id: 'l19_1', productId: 'p19', supplierId: 's6', price: 1650.00, stock: 5, deliveryHours: 48, warrantyMonths: 12, rating: 4.6, condition: 'Nuevo' },
  { id: 'l19_2', productId: 'p19', supplierId: 's2', price: 1800.00, stock: 3, deliveryHours: 12, warrantyMonths: 18, rating: 4.9, condition: 'Nuevo' },

  // Ultrasonido UDS-J (p49)
  { id: 'l49_1', productId: 'p49', supplierId: 's6', price: 680.00, stock: 8, deliveryHours: 48, warrantyMonths: 12, rating: 4.7, condition: 'Nuevo' },

  // Autoclave Clase B (p15)
  { id: 'l15_1', productId: 'p15', supplierId: 's6', price: 6500.00, stock: 2, deliveryHours: 48, warrantyMonths: 24, rating: 4.8, condition: 'Nuevo' },
  { id: 'l15_2', productId: 'p15', supplierId: 's2', price: 6900.00, stock: 3, deliveryHours: 12, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },
  { id: 'l15_3', productId: 'p15', supplierId: 's6', price: 5400.00, stock: 1, deliveryHours: 48, warrantyMonths: 12, rating: 4.2, condition: 'Reacondicionado' },

  // Selladora termica (p50)
  { id: 'l50_1', productId: 'p50', supplierId: 's6', price: 420.00, stock: 6, deliveryHours: 48, warrantyMonths: 12, rating: 4.6, condition: 'Nuevo' },

  // Rollos manga (p51)
  { id: 'l51_1', productId: 'p51', supplierId: 's5', price: 78.00, stock: 120, deliveryHours: 36, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },
  { id: 'l51_2', productId: 'p51', supplierId: 's10', price: 72.00, stock: 200, deliveryHours: 36, warrantyMonths: 0, rating: 4.3, condition: 'Nuevo' },

  // Indicador Clase 5 (p52)
  { id: 'l52_1', productId: 'p52', supplierId: 's5', price: 145.00, stock: 50, deliveryHours: 36, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },

  // Escáner intraoral (p18)
  { id: 'l18_1', productId: 'p18', supplierId: 's6', price: 45800.00, stock: 2, deliveryHours: 48, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },
  { id: 'l18_2', productId: 'p18', supplierId: 's6', price: 39500.00, stock: 1, deliveryHours: 48, warrantyMonths: 12, rating: 4.4, condition: 'Reacondicionado' },

  // Resina 3D temporal (p53)
  { id: 'l53_1', productId: 'p53', supplierId: 's6', price: 320.00, stock: 15, deliveryHours: 48, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' }
];

export const kits: Kit[] = [
  {
    id: 'k1',
    name: 'Kit de Profilaxis y Prevención',
    description: 'Materiales esenciales para limpiezas dentales de rutina, profilaxis y remoción de tártaro.',
    image: 'kit_profilaxis',
    items: [
      { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', category: 'Bioseguridad', quantity: 2, recommendedBrand: 'BioClean' },
      { productName: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)', category: 'Bioseguridad', quantity: 1, recommendedBrand: 'BioClean' },
      { productName: 'Alginato Kromopan Cromático de Fraguado Rápido', category: 'Materiales de impresión', quantity: 2, recommendedBrand: 'Lascod' },
      { productName: 'Espejo Dental #5 de Rodio con Mango', category: 'Instrumental', quantity: 2, recommendedBrand: 'Hu-Friedy' }
    ]
  },
  {
    id: 'k2',
    name: 'Kit de Operatoria Estética',
    description: 'Todo lo necesario para restauraciones directas estéticas con resina compuesta y fotocurado.',
    image: 'kit_operatoria',
    items: [
      { productName: 'Resina Filtek Z350 XT Body A2', category: 'Operatoria', quantity: 3, recommendedBrand: '3M ESPE' },
      { productName: 'Adhesivo Single Bond Universal', category: 'Operatoria', quantity: 1, recommendedBrand: '3M ESPE' },
      { productName: 'Lámpara de Fotocurado Led-D', category: 'Operatoria', quantity: 1, recommendedBrand: 'Woodpecker' },
      { productName: 'Dique de Goma Nic Tone Azul', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Coltene' },
      { productName: 'Grabador Ácido Ultra-Etch', category: 'Operatoria', quantity: 2, recommendedBrand: 'Coltene' }
    ]
  },
  {
    id: 'k3',
    name: 'Kit de Endodoncia Rotatoria',
    description: 'Conjunto completo para instrumentación, aislamiento y sellado tridimensional de conductos radiculares.',
    image: 'kit_endodoncia',
    items: [
      { productName: 'Limas Rotatorias ProTaper Gold F2 (25mm)', category: 'Endodoncia', quantity: 2, recommendedBrand: 'Maillefer' },
      { productName: 'Cemento Sellador AH Plus Jet', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Dentsply Sirona' },
      { productName: 'Conos de Gutapercha ProTaper Gold F2', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Dentsply Sirona' },
      { productName: 'Hipoclorito de Sodio al 5.25%', category: 'Endodoncia', quantity: 3, recommendedBrand: 'BioClean' },
      { productName: 'Dique de Goma Nic Tone Azul', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Coltene' },
      { productName: 'Motor de Endodoncia Endo Radar Plus', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Woodpecker' }
    ]
  },
  {
    id: 'k4',
    name: 'Kit de Cirugía Oral & Extracción',
    description: 'Instrumental y consumibles para cirugías menores, exodoncia y sutura segura.',
    image: 'kit_cirugia',
    items: [
      { productName: 'Fórceps Dental Hu-Friedy #150 Universal', category: 'Cirugía', quantity: 1, recommendedBrand: 'Hu-Friedy' },
      { productName: 'Elevador de Raíces Recto Fino #301', category: 'Cirugía', quantity: 1, recommendedBrand: 'Hu-Friedy' },
      { productName: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)', category: 'Anestesia', quantity: 2, recommendedBrand: 'Zeyco' },
      { productName: 'Agujas Dentales Desechables Terumo 30G Cortas', category: 'Consumibles', quantity: 1, recommendedBrand: 'Terumo' },
      { productName: 'Hilo de Sutura Seda Negra 3-0', category: 'Cirugía', quantity: 2, recommendedBrand: 'BioClean' },
      { productName: 'Mango de Bisturí #3 con 10 Hojas #15', category: 'Cirugía', quantity: 1, recommendedBrand: 'Hu-Friedy' }
    ]
  },
  {
    id: 'k5',
    name: 'Kit de Implantología Básica',
    description: 'Solución para la preparación ósea y colocación de implantes de titanio tipo cono morse.',
    image: 'kit_implantes',
    items: [
      { productName: 'Implante Dental Titanio Cono Morse Alvim', category: 'Implantología', quantity: 5, recommendedBrand: 'Morelli' },
      { productName: 'Pilar Cicatrizal Cono Morse', category: 'Implantología', quantity: 5, recommendedBrand: 'Morelli' },
      { productName: 'Transfer de Impresión Cono Morse Cubeta Abierta', category: 'Implantología', quantity: 2, recommendedBrand: 'Morelli' },
      { productName: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)', category: 'Anestesia', quantity: 1, recommendedBrand: 'Zeyco' }
    ]
  },
  {
    id: 'k6',
    name: 'Kit de Ortodoncia Inicial',
    description: 'El kit indispensable para el montaje inicial de aparatología fija Roth.',
    image: 'kit_ortodoncia',
    items: [
      { productName: 'Brackets Metálicos Roth .022', category: 'Ortodoncia', quantity: 5, recommendedBrand: 'Morelli' },
      { productName: 'Arcos de Nitinol Redondos .014 Superelásticos', category: 'Ortodoncia', quantity: 5, recommendedBrand: 'OrthoClassic' },
      { productName: 'Tubos Bucales de Cementación Simple Molar', category: 'Ortodoncia', quantity: 5, recommendedBrand: 'Morelli' },
      { productName: 'Adhesivo Transbond XT para Brackets', category: 'Ortodoncia', quantity: 1, recommendedBrand: '3M ESPE' }
    ]
  },
  {
    id: 'k7',
    name: 'Kit de Bioseguridad Profesional',
    description: 'Insumos de barrera obligatoria para consultorio odontológico moderno.',
    image: 'kit_bioseguridad',
    items: [
      { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', category: 'Bioseguridad', quantity: 10, recommendedBrand: 'BioClean' },
      { productName: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)', category: 'Bioseguridad', quantity: 4, recommendedBrand: 'BioClean' },
      { productName: 'Jabón Antiséptico Germikil', category: 'Bioseguridad', quantity: 1, recommendedBrand: 'BioClean' },
      { productName: 'Lentes de Protección Dental Anti-Empañantes', category: 'Bioseguridad', quantity: 2, recommendedBrand: 'BioClean' }
    ]
  },
  {
    id: 'k8',
    name: 'Kit de Esterilización y Control',
    description: 'Garantiza el correcto empaque y sellado del instrumental a autoclavar.',
    image: 'kit_esterilizacion',
    items: [
      { productName: 'Selladora Térmica de Bolsas de Esterilización', category: 'Esterilización', quantity: 1, recommendedBrand: 'Woodpecker' },
      { productName: 'Rollos de Manga para Esterilización 10cm x 200m', category: 'Esterilización', quantity: 2, recommendedBrand: 'BioClean' },
      { productName: 'Indicador Integrador Químico Clase 5', category: 'Esterilización', quantity: 1, recommendedBrand: 'BioClean' }
    ]
  },
  {
    id: 'k9',
    name: 'Kit para Apertura de Consultorio',
    description: 'La combinación perfecta de equipamiento pesado y tecnología digital para abrir tu clínica.',
    image: 'kit_apertura',
    items: [
      { productName: 'Autoclave Digital 21 Litros Clase B', category: 'Esterilización', quantity: 1, recommendedBrand: 'Woodpecker' },
      { productName: 'Compresora Dental Libre de Aceite 1.5 HP', category: 'Equipamiento', quantity: 1, recommendedBrand: 'Woodpecker' },
      { productName: 'Turbina Dental Alegra TE-97 (B2)', category: 'Equipamiento', quantity: 2, recommendedBrand: 'W&H' },
      { productName: 'Micromotor Eléctrico Strong 204', category: 'Equipamiento', quantity: 1, recommendedBrand: 'Woodpecker' },
      { productName: 'Escáner Intraoral Medit i700', category: 'Odontología digital', quantity: 1, recommendedBrand: 'Medit' }
    ]
  }
];

export function getProductListings(productId: string): ProductListing[] {
  return listings.filter(l => l.productId === productId);
}

export function getProductWithListings(productId: string) {
  const product = products.find(p => p.id === productId);
  if (!product) return null;
  const productListings = getProductListings(productId);
  return { ...product, listings: productListings };
}

export interface ProposalItem {
  product: Product;
  listing: ProductListing;
  supplier: Supplier;
  reason: string;
}

export interface Proposal {
  type: 'economy' | 'value' | 'premium';
  name: string;
  items: ProposalItem[];
  totalCost: number;
  estimatedSavings: number;
  shippingDaysMax: number;
}

export function generateProposalsForItems(
  itemRequirements: { productName: string; quantity: number; category?: string }[]
): { economy: Proposal; value: Proposal; premium: Proposal } {
  
  const economyItems: ProposalItem[] = [];
  const valueItems: ProposalItem[] = [];
  const premiumItems: ProposalItem[] = [];

  itemRequirements.forEach(req => {
    const reqCategory = req.category;
    let product = products.find(p => p.name.toLowerCase() === req.productName.toLowerCase()) 
               || products.find(p => p.name.toLowerCase().includes(req.productName.toLowerCase()))
               || (reqCategory ? products.find(p => p.category.toLowerCase() === reqCategory.toLowerCase()) : undefined)
               || products.find(p => p.category.toLowerCase().includes(req.productName.toLowerCase()))
               || products[0];
                 
    const prodListings = listings.filter(l => l.productId === product.id && l.stock > 0);
    
    if (prodListings.length === 0) {
      const allListings = listings.filter(l => l.productId === product.id);
      const fallbackListing = allListings[0] || listings[0];
      const supplier = suppliers.find(s => s.id === fallbackListing.supplierId) || suppliers[0];
      const item: ProposalItem = { product, listing: fallbackListing, supplier, reason: 'Único proveedor disponible' };
      economyItems.push(item);
      valueItems.push(item);
      premiumItems.push(item);
      return;
    }

    // 1. Economy: Lowest price in stock
    const econListing = [...prodListings].sort((a, b) => a.price - b.price)[0];
    const econSupplier = suppliers.find(s => s.id === econListing.supplierId)!;
    economyItems.push({
      product,
      listing: econListing,
      supplier: econSupplier,
      reason: `Menor costo: S/. ${econListing.price.toFixed(2)}`
    });

    // 2. Premium: New, highest warranty, then price/rating sorted
    const premListing = [...prodListings].sort((a, b) => {
      if (a.condition !== b.condition) return a.condition === 'Nuevo' ? -1 : 1;
      if (a.warrantyMonths !== b.warrantyMonths) return b.warrantyMonths - a.warrantyMonths;
      return b.price - a.price;
    })[0];
    const premSupplier = suppliers.find(s => s.id === premListing.supplierId)!;
    premiumItems.push({
      product,
      listing: premListing,
      supplier: premSupplier,
      reason: `Opción Premium: ${premListing.condition} con ${premListing.warrantyMonths > 0 ? premListing.warrantyMonths + ' meses de garantía' : 'garantía estándar'}`
    });

    // 3. Best Value (Recommended): Score based on rating & price & delivery time
    const valListing = [...prodListings].sort((a, b) => {
      const scoreA = (a.rating * 15) - (a.price / 80) - (a.deliveryHours / 6) + (a.warrantyMonths / 2);
      const scoreB = (b.rating * 15) - (b.price / 80) - (b.deliveryHours / 6) + (b.warrantyMonths / 2);
      return scoreB - scoreA;
    })[0];
    const valSupplier = suppliers.find(s => s.id === valListing.supplierId)!;
    valueItems.push({
      product,
      listing: valListing,
      supplier: valSupplier,
      reason: `Recomendada: Calidad ${valListing.rating}⭐ y entrega rápida en ${valListing.deliveryHours}h`
    });
  });

  const calcTotal = (items: ProposalItem[]) => items.reduce((sum, item) => {
    const req = itemRequirements.find(r => 
      item.product.name.toLowerCase().includes(r.productName.toLowerCase()) || 
      item.product.category.toLowerCase() === r.productName.toLowerCase()
    );
    const qty = req ? req.quantity : 1;
    return sum + (item.listing.price * qty);
  }, 0);
  
  const calcMaxShipping = (items: ProposalItem[]) => Math.max(...items.map(i => i.listing.deliveryHours)) / 24;

  const totalEcon = calcTotal(economyItems);
  const totalVal = calcTotal(valueItems);
  const totalPrem = calcTotal(premiumItems);

  const economy: Proposal = {
    type: 'economy',
    name: 'Propuesta Económica',
    items: economyItems,
    totalCost: totalEcon,
    estimatedSavings: Math.max(0, totalVal - totalEcon),
    shippingDaysMax: Math.ceil(calcMaxShipping(economyItems))
  };

  const value: Proposal = {
    type: 'value',
    name: 'Mejor Relación Calidad-Precio',
    items: valueItems,
    totalCost: totalVal,
    estimatedSavings: Math.max(0, totalPrem - totalVal),
    shippingDaysMax: Math.ceil(calcMaxShipping(valueItems))
  };

  const premium: Proposal = {
    type: 'premium',
    name: 'Propuesta Premium',
    items: premiumItems,
    totalCost: totalPrem,
    estimatedSavings: 0,
    shippingDaysMax: Math.ceil(calcMaxShipping(premiumItems))
  };

  return { economy, value, premium };
}
