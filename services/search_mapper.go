package services

import "tachi-desktop/models"

func MapToDomain(dto models.SearchRawData) models.SearchResult {
	return models.SearchResult{
		ID:             dto.ID,
		Slug:           dto.RealID,
		Source:         dto.Platform,
		CoverImage:     dto.Image,
		Status:         dto.Status,
		Genres:         dto.Categories,
		Chapters:       dto.ChapterCount,
		Format:         dto.Type,
		IsAdult:        dto.IsErotic == "si",
		TargetAudience: dto.Demographic,
		Title:          dto.OriginalTitle,
	}
}
