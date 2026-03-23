package models

type ManhwaDetails struct {
	ID           string     `json:"id"`
	Name         string     `json:"name"`
	Platform     string     `json:"platform"`
	Image        string     `json:"image"`
	Status       string     `json:"status"`
	Categories   []Category `json:"categories"`
	Synopsis     string     `json:"synopsis"`
	ChapterCount int64      `json:"chapter_count"`
	TheRealName  string     `json:"the_real_name"`
	LinkSpanish  string     `json:"link_spanish"`
	NameSpanish  string     `json:"name_spanish"`
	IsErotic     bool       `json:"is_erotic"`
	Type         string     `json:"type"`
	Demography   string     `json:"demography"`
	RealID       string     `json:"real_id"`
	Popularity   int64      `json:"popularity"`
	Chapters     []Chapter  `json:"chapters"`
	Authors      []string   `json:"authors"`
	IsHiatus     bool       `json:"is_hiatus"`
	HiatusImages []any      `json:"hiatus_images"`
}

type Category struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
