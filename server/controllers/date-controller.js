// const dateFromDatabase = new Date('2024-04-17T00:00:00.000Z'); // This would come from your database
// const dateInLocalTimezone = dateFromDatabase.toISOString().substring(0, 10); // '2024-04-17'


export const nextDates = (req, res) => {
    const dates = [];
    for (let i = 1; i < 4; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const formattedDate = date.toISOString().substring(0, 10);
        dates.push(formattedDate);
    }
    res.json({ dates: dates });
};