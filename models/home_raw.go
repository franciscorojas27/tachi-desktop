package models

type HomeRaw struct {
	LasteManhwaCreated     []ManhwaCreatedRaw `json:"utimos_mangas_creados"`
	LasteManhwaCreatedNSFW []ManhwaCreatedRaw `json:"utimos_mangas_creados_18"`
	Top                    TopSectionRaw         `json:"top"`
	Manhwas                ManhwasContainer   `json:"manhwas"`
}

type ManhwaCreatedRaw struct {
	ID          string `json:"_id"`
	Plataforma  string `json:"_plataforma"`
	Imagen      string `json:"_imagen"`
	Categorias  []int  `json:"_categoris"`
	Tipo        string `json:"_tipo"`
	Erotico     string `json:"_erotico"`
	Demografia  string `json:"_demografi"`
	TheRealName string `json:"the_real_name"`
}

type TopSectionRaw struct {
	ManhwasEsp []TopItemRaw `json:"manhwas_esp"` // top weekend
	ManhwasRaw []TopItemRaw `json:"manhwas_raw"` // top total
}

type TopItemRaw struct {
	Link   string  `json:"link"`
	Status string  `json:"_status"`
	Caps   float64 `json:"caps"`
	Imagen string  `json:"imagen"`
	Name   string  `json:"name"`
}

type ManhwasContainer struct {
	Manhwas    []ManhwaDetail `json:"_manhwas"`    // manhwa new chapters +18
	ManhwasEsp []ManhwaDetail `json:"manhwas_esp"` // manhwa new chapters
}

type ManhwaDetail struct {
	NameManhwa string  `json:"name_manhwa"`
	Chapter    float64 `json:"chapter"`
	Demografia string  `json:"_demografi"`
	Img        string  `json:"img"`
	IDRel      string  `json:"id_rel"`
	Plataforma string  `json:"_plataforma"`
	Tipo       string  `json:"_tipo"`
	LGBT       string  `json:"lgbt"`
}
