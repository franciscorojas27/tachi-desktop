package models

type Home struct {
	LastCreated     []ManhwaCreated   `json:"lastCreated"`
	LastCreatedNSFW []ManhwaCreated   `json:"lastCreatedNsfw"`
	Top             TopSection        `json:"top"`
	Chapters        ChaptersContainer `json:"chapters"`
}

type ManhwaCreated struct {
	ID         string `json:"id"`
	Title      string `json:"title"`
	Image      string `json:"image"`
	Type       string `json:"type"` // manga, manhwa, etc.
	Demography string `json:"demography"`
	IsErotic   string `json:"isErotic"` // "si" o "no"
	Platform   string `json:"platform"`
	Categories []int  `json:"categories"`
}

type TopSection struct {
	TopWeekend []TopItem `json:"topWeekend"`
	TopTotal   []TopItem `json:"topTotal"`
}

type TopItem struct {
	ID     string  `json:"id"` // Extraído del link
	Name   string  `json:"name"`
	Image  string  `json:"image"`
	Status string  `json:"status"`
	Caps   float64 `json:"caps"`
}

type ChaptersContainer struct {
	RecentNSFW []ChapterDetail `json:"recentNsfw"`
	RecentEsp  []ChapterDetail `json:"recentEsp"`
}

type ChapterDetail struct {
	ID         string  `json:"id"`
	Title      string  `json:"title"`
	Link       string  `json:"link"`
	Chapter    float64 `json:"chapter"`
	Image      string  `json:"image"`
	Demography string  `json:"demography"`
	Type       string  `json:"type"`
	IsLGBT     string  `json:"isLgbt"`
}
