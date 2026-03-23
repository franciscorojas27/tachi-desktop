package models

type ManhwaRawDetails struct {
	ID          string              `json:"_id"`
	Name        string              `json:"_name"`
	Plataforma  string              `json:"_plataforma"`
	Imagen      string              `json:"_imagen"`
	Status      string              `json:"_status"`
	Categoris   []map[string]string `json:"_categoris"`
	Sinopsis    string              `json:"_sinopsis"`
	NumeroCap   int64               `json:"_numero_cap"`
	Extras      Extras              `json:"_extras"`
	TheRealName string              `json:"the_real_name"`
	LinkEsp     string              `json:"link_esp"`
	NameEsp     string              `json:"name_esp"`
	Erotico     string              `json:"_erotico"`
	Tipo        string              `json:"_tipo"`
	Demografi   string              `json:"_demografi"`
	Chapters    []Chapter           `json:"chapters"`
	RealID      string              `json:"real_id"`
	Popularidad int64               `json:"popularidad"`
}

type Chapter struct {
	Chapter float64  `json:"chapter"`
	Link    string   `json:"link"`
	Create  int64    `json:"create"`
	Img     []string `json:"img,omitempty"`
}

type Extras struct {
	Autores        []string `json:"autores"`
	Hiatus         bool     `json:"hiatus"`
	HiatusImagenes []any    `json:"hiatus_imagenes"`
}
