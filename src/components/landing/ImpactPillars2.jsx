import React, { useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';

const servicesData = [
    {
        id: '01',
        title: 'Sports',
        description: 'Build mental resilience and confidence through coaching, teamwork, and healthy competition.',
        icon: <SportsBasketballOutlinedIcon sx={{ fontSize: 32 }} />,
    },
    {
        id: '02',
        title: 'Friendship',
        description: 'Cultivate inclusive peer support networks where kindness and encouragement are the norm.',
        icon: <GroupsOutlinedIcon sx={{ fontSize: 32 }} />,
    },
    {
        id: '03',
        title: 'Family',
        description: 'Strengthen family bonds that nurture growth, stability, and a sense of belonging.',
        icon: <Diversity1OutlinedIcon sx={{ fontSize: 32 }} />,
    },
    {
        id: '04',
        title: 'Faith',
        description: 'Inspire courage, purpose, and compassion through values that guide and uplift.',
        icon: <VolunteerActivismOutlinedIcon sx={{ fontSize: 32 }} />,
    }
];

const ImpactPillars2 = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Box sx={{ py: { xs: 5, md: 10 }, background: "#E8E5DD", overflow: 'hidden', color: '#1a1a1a' }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ mb: 12, borderBottom: "1px solid rgba(0,0,0,0.1)", pb: 4 }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: "serif",
                            fontWeight: 400,
                            fontSize: { xs: "12vw", md: "4rem" },
                            lineHeight: 1.2,
                            color: "#1a1a1a",
                            mb: 4
                        }}
                    >
                        Empowering Youth with Resilience, Kindness & Courage
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "800px", fontSize: "1.2rem", lineHeight: 1.6 }}>
                        Inspired by Sean Clark’s spirit, our pillars channel the positive influence of
                        sports, friendship, family and faith—so young people can thrive and advocate
                        for themselves and others.
                    </Typography>
                </Box>

                <Stack spacing={0}>
                    {servicesData.map((service, index) => (
                        <Box
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            sx={{
                                borderBottom: "1px solid rgba(0,0,0,0.1)",
                                py: 6,
                                transition: "all 0.4s ease",
                                // opacity: activeIndex === index ? 1 : 0.4,
                            }}
                        >
                            <Stack
                                direction={{ xs: "column", md: "row" }}
                                alignItems={{ xs: "flex-start", md: "center" }}
                                justifyContent="space-between"
                                spacing={4}
                            >
                                {/* Left: Number & Title */}
                                <Box sx={{ width: { md: "40%" } }}>
                                    <Stack direction="row" alignItems="flex-start" spacing={3}>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontWeight: 800,
                                                color: "rgba(0,0,0,0.1)",
                                                lineHeight: 0.8,
                                                fontSize: "3rem",
                                                fontFamily: 'monospace'
                                            }}
                                        >
                                            {service.id}
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                                            {service.title}
                                        </Typography>
                                    </Stack>
                                </Box>

                                {/* Middle: Description */}
                                <Box sx={{ width: { md: "45%" } }}>
                                    <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6, fontSize: "1.2rem" }}>
                                        {service.description}
                                    </Typography>
                                </Box>

                                {/* Right: Icon */}
                                <Box sx={{ width: { md: "15%" }, display: "flex", justifyContent: "flex-end" }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: "50%",
                                            color: "#339c5e",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {service.icon}
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default ImpactPillars2;
