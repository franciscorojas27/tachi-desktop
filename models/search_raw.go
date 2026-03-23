package models

type SearchRaw struct {
	Data []SearchRawData `json:"data"`
	Next bool            `json:"next"`
}

type SearchRawData struct {
	ID            string  `json:"_id"`
	RealID        string  `json:"real_id"`
	Platform      string  `json:"_plataforma"`
	Image         string  `json:"_imagen"`
	Status        string  `json:"_status"`
	Categories    []int   `json:"_categoris"`
	ChapterCount  float64 `json:"_numero_cap"`
	Type          string  `json:"_tipo"`
	IsErotic      string  `json:"_erotico"`
	Demographic   string  `json:"_demografi"`
	OriginalTitle string  `json:"the_real_name"`
	NameEsp       string  `json:"name_esp"`
}
