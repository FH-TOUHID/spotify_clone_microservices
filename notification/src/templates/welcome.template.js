export default function welcomeTemplate(fullname, role) {
  return `

    <!DOCTYPE html>
    <html>

    <body>

        <h2>Welcome to Spotify 🎵</h2>


        <p>
            Hello ${fullname.firstName},
        </p>


        <p>
            Thank you for registering with Spotify.
            Your account has been created successfully.
        </p>


        <p>
            Account Type:
            <strong>${role}</strong>
        </p>


        <br>


        <p>
            Start listening to your favorite music now.
        </p>


        <p>
            Regards,<br>
            Spotify Team
        </p>


    </body>

    </html>

    `;
}
