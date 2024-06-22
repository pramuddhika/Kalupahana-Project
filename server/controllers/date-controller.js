import axios from 'axios';

export const nextDates = async (req, res) => {
    try {
        // Fetch holidays from the API
        const holidaysResponse = await axios.get('http://localhost:8000/api/settings/getholidays');
        const holidaysData = holidaysResponse.data;

        // Extract holiday dates from the response
        const holidays = holidaysData.map(holiday => holiday.holidays);

        // Generate the next 14 days
        const dates = [];
        for (let i = 1; i <= 14; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const formattedDate = date.toISOString().substring(0, 10);
            dates.push(formattedDate);
        }

        // Remove holidays from the dates array
        const filteredDates = dates.filter(date => !holidays.includes(date));

        // Return only the first 3 remaining dates
        const result = filteredDates.slice(0, 3);
        console.log({ dates: result })
        res.json({ dates: result });

    } catch (err) {
        console.error(err.message);
        return;
    }
};
