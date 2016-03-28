namespace BusTracker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAzoneBzone : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BusModels", "Wigth", c => c.Int(nullable: false));
            AddColumn("dbo.BusModels", "Azone", c => c.Int(nullable: false));
            AddColumn("dbo.BusModels", "Bzone", c => c.Int(nullable: false));
            DropColumn("dbo.BusModels", "Wight");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BusModels", "Wight", c => c.Int(nullable: false));
            DropColumn("dbo.BusModels", "Bzone");
            DropColumn("dbo.BusModels", "Azone");
            DropColumn("dbo.BusModels", "Wigth");
        }
    }
}
