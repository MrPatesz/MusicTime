namespace MusicTime.Bll.Dtos
{
    public class PasswordChangeDto
    {
        public string UserName { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
