package models

type SearchResult struct {
	ID             string `json:"id"`
	Slug           string `json:"slug"`
	Source         string `json:"source"`
	CoverImage     string `json:"cover_image"`
	Status         string `json:"status"`
	Genres         []int  `json:"genres"`
	Chapters       float64    `json:"chapters"`
	Format         string `json:"format"`
	IsAdult        bool   `json:"is_adult"`
	TargetAudience string `json:"target_audience"`
	Title          string `json:"title"`
}

type SearchData struct {
	Results []SearchResult `json:"results"`
	Next    bool           `json:"next"`
}
